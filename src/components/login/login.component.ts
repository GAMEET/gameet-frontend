import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RegisterComponent } from '../register/register.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  images: string[] = [
    'http://www.hdwallpaper.nu/wp-content/uploads/2017/04/PLAYERUNKNOWNS-BATTLEGROUNDS-12937710.jpg',
    'https://www.hdwallpapers.in/walls/overwatch_4k-HD.jpg',
    'https://images.alphacoders.com/186/186993.jpg',
    'https://images4.alphacoders.com/602/thumb-1920-602788.png'
  ];
  currentBackground: string = '';
  private intervalId: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.currentBackground = this.images[0];
    this.startBackgroundRotation();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startBackgroundRotation(): void {
    let index = 0;
    this.intervalId = setInterval(() => {
      index = (index + 1) % this.images.length;
      this.currentBackground = this.images[index];
    }, 10000); // Cambia cada 10 segundos
  }

  onLogin(): void {
    if (this.authService.login(this.username, this.password)) {
      alert('Login successful!');
      // Redireccionar a otra página o simplemente indicar éxito
    } else {
      alert('Login failed!');
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}