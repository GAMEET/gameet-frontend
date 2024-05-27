import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  terminosYCondiciones: string = `
  ### Términos y Condiciones de GAMEET

  #### 1. Introducción

  Bienvenido a GAMEET, una red social diseñada para ayudar a los gamers a encontrar compañeros de videojuegos en línea. Al utilizar nuestros servicios, usted acepta cumplir y estar sujeto a los siguientes términos y condiciones. Por favor, léalos cuidadosamente.

  #### 2. Aceptación de los Términos

  Al acceder o usar cualquier parte de la plataforma GAMEET, usted acepta estar sujeto a estos términos y condiciones. Si no está de acuerdo con todos los términos y condiciones de este acuerdo, entonces no puede acceder a la plataforma ni utilizar ninguno de sus servicios.

  #### 3. Información Personal

  Para utilizar nuestros servicios, es posible que le solicitemos que proporcione ciertos datos personales, incluyendo, pero no limitado a:

  - Imagen de perfil
  - Nombre de usuario
  - Email
  - Número de teléfono
  - Descripción personal
  - Características personales (como intereses y preferencias de juego)
  - Horario de juego preferido

  #### 4. Uso de la Información Personal

  La información personal que recopilamos se utilizará para los siguientes propósitos:

  - Crear y gestionar su cuenta en GAMEET.
  - Facilitar la conexión con otros usuarios que compartan intereses similares en videojuegos.
  - Personalizar su experiencia en la plataforma.
  - Enviar comunicaciones relacionadas con el servicio, actualizaciones y promociones.

  #### 5. Privacidad y Seguridad

  En GAMEET, nos comprometemos a proteger su privacidad y sus datos personales. Implementamos medidas de seguridad adecuadas para proteger su información contra accesos no autorizados, alteraciones, divulgaciones o destrucción.

  #### 6. Conducta del Usuario

  Al utilizar GAMEET, usted se compromete a:

  - No utilizar la plataforma para ningún propósito ilegal o no autorizado.
  - No acosar, abusar, insultar, dañar, difamar, calumniar, desprestigiar, intimidar o discriminar a otros usuarios.
  - No cargar o transmitir virus o cualquier tipo de código malicioso que afecte la funcionalidad o el funcionamiento de GAMEET.
  - Respetar los derechos de privacidad y propiedad de otros usuarios.

  #### 7. Contenido Generado por el Usuario

  Usted es responsable de todo el contenido que publique en GAMEET. Nos reservamos el derecho de eliminar cualquier contenido que, a nuestra discreción, consideremos inapropiado, ofensivo o que viole estos términos y condiciones.

  #### 8. Terminación del Servicio

  Podemos, a nuestra sola discreción, suspender o terminar su cuenta y el acceso a GAMEET, sin previo aviso, por cualquier violación de estos términos y condiciones.

  #### 9. Modificaciones a los Términos y Condiciones

  Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Le notificaremos de cualquier cambio a través de la plataforma o por correo electrónico. Su uso continuado de GAMEET después de dichos cambios constituye su aceptación de los nuevos términos y condiciones.

  #### 10. Contacto

  Si tiene alguna pregunta o inquietud acerca de estos términos y condiciones, por favor, póngase en contacto con nosotros a través de [email de contacto].

  ---

  Al utilizar GAMEET, usted reconoce que ha leído, entendido y acepta estar sujeto a estos términos y condiciones.
`;

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
