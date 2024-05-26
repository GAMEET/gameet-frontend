import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  baseColor = 'rgb(230,230,230)';
  activeColor = 'rgb(237, 40, 70)';
  child = 1;
  sections = [
    { hidden: false, transform: 'translateX(0)' },
    { hidden: true, transform: 'translateX(100px)' },
    { hidden: true, transform: 'translateX(100px)' },
    { hidden: true, transform: 'translateX(100px)' },
    { hidden: true, transform: 'translateX(100px)' }
  ];
  selectedFile: File | null = null;
  imageUrl: string = 'https://d30y9cdsu7xlg0.cloudfront.net/png/138926-200.png'; // Default image URL

  @ViewChild('fileInput') fileInput!: ElementRef;

  formData: any = {
    username: '',
    password: '',
    descripcion: '',
    email: '',
    imagenPerfil: '',
    telefono: '',
    caracteristicas: [],
    horarioJuego: '' // Cambiar a un string para una sola selección
  };

  constructor(private renderer: Renderer2, private router: Router, private registerService: RegisterService) { }

  ngOnInit(): void {
    this.createSVG();
    this.updateSections();
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  previewFile(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files ? input.files[0] : null;

    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        this.imageUrl = reader.result as string;
      }, false);

      reader.readAsDataURL(file);
    }
  }

  createSVG(): void {
    const svgWrap = document.getElementById('svg_wrap');
    const svgWidth = (this.sections.length - 1) * 200 + 24;
    const svg = this.renderer.createElement('svg', 'http://www.w3.org/2000/svg');
    this.renderer.setAttribute(svg, 'viewBox', `0 0 ${svgWidth} 24`);
    this.renderer.setAttribute(svg, 'id', 'svg_form_time');
    this.renderer.appendChild(svgWrap, svg);

    for (let i = 0; i < this.sections.length - 1; i++) {
      const positionX = 12 + i * 200;
      const rect = this.makeSVG('rect', { x: positionX, y: 9, width: 200, height: 6 });
      this.renderer.appendChild(svg, rect);
      const circle = this.makeSVG('circle', { cx: positionX, cy: 12, r: 12 });
      this.renderer.appendChild(svg, circle);
    }

    const lastCircle = this.makeSVG('circle', { cx: 12 + (this.sections.length - 1) * 200, cy: 12, r: 12 });
    this.renderer.appendChild(svg, lastCircle);

    this.setSVGStyles();
  }

  makeSVG(tag: string, attrs: any): any {
    const el = this.renderer.createElement(tag, 'http://www.w3.org/2000/svg');
    for (const key in attrs) {
      if (attrs.hasOwnProperty(key)) {
        this.renderer.setAttribute(el, key, attrs[key]);
      }
    }
    return el;
  }

  setSVGStyles(): void {
    const svg = document.getElementById('svg_form_time');
    if (svg) {
      const rects = svg.querySelectorAll('rect');
      const circles = svg.querySelectorAll('circle');

      rects.forEach(rect => this.renderer.setStyle(rect, 'fill', this.baseColor));
      circles.forEach(circle => this.renderer.setStyle(circle, 'fill', this.baseColor));
      this.renderer.setStyle(circles[0], 'fill', this.activeColor);
    }
  }

  updateSections(): void {
    this.sections.forEach((section, index) => {
      section.hidden = index !== (this.child - 1);
      section.transform = index < (this.child - 1) ? 'translateX(-100px)' : (index === (this.child - 1) ? 'translateX(0)' : 'translateX(100px)');
    });
    this.setSVGStyles();
    const svg = document.getElementById('svg_form_time');
    if (svg) {
      const circles = svg.querySelectorAll('circle');
      circles.forEach(circle => this.renderer.setStyle(circle, 'fill', this.baseColor));
      this.renderer.setStyle(circles[this.child - 1], 'fill', this.activeColor);
    }
  }

  next(): void {
    if (this.child < this.sections.length) {
      this.child++;
      this.updateSections();
    }
  }

  prev(): void {
    if (this.child > 1) {
      this.child--;
      this.updateSections();
    }
  }

  isPrevDisabled(): boolean {
    return this.child <= 1;
  }

  isNextDisabled(): boolean {
    return this.child >= this.sections.length;
  }

  isSubmitDisabled(): boolean {
    return this.child < this.sections.length;
  }

  goToLogin() {
    this.router.navigate(['/']);
  }

  updateCaracteristicas(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      this.formData.caracteristicas.push(input.value);
    } else {
      this.formData.caracteristicas = this.formData.caracteristicas.filter((item: string) => item !== input.value);
    }
  }

  updateHorarioJuego(event: Event) {
    const input = event.target as HTMLInputElement;
    this.formData.horarioJuego = input.value;
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('username', this.formData.username);
    formData.append('password', this.formData.password);
    formData.append('descripcion', this.formData.descripcion);
    formData.append('email', this.formData.email);
    if (this.selectedFile) {
      formData.append('imagenPerfil', this.selectedFile);
    }
    formData.append('telefono', this.formData.telefono);
    formData.append('caracteristicas', this.formData.caracteristicas.join(',')); // Convertir a cadena de caracteres separada por comas
    formData.append('horarioJuego', this.formData.horarioJuego); // Solo un valor

    this.registerService.register(formData).subscribe(
      success => {
        if (success) {
          console.log('Registro exitoso');
          this.router.navigate(['/carrusel']);
        } else {
          console.error('Error en el registro');
        }
      },
      error => {
        console.error('Error en el registro', error);
      }
    );
  }
}
