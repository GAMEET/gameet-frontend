import { Component, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit, AfterViewInit {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    // Place any initialization logic here if needed
  }

  ngAfterViewInit(): void {
    this.initQuoteLoop();
    this.initNavigation();
    this.initSmoothScrolling();
    this.initAnimations();
  }

  private initQuoteLoop(): void {
    const quotes = this.el.nativeElement.querySelectorAll('.quoteLoop > .quote');
    if (quotes.length === 0) return;

    const fade = (element: HTMLElement) => {
      this.renderer.setStyle(element, 'display', 'block');
      setTimeout(() => {
        this.renderer.setStyle(element, 'display', 'none');
        const nextElement = element.nextElementSibling as HTMLElement || quotes[0];
        fade(nextElement);
      }, 4000); // 1000ms fadeIn + 3000ms delay + 1000ms fadeOut
    };

    fade(quotes[0] as HTMLElement);
  }

  private initNavigation(): void {
    window.addEventListener('scroll', () => {
      const mainNav = this.el.nativeElement.querySelector('.main_nav');
      if (window.scrollY > 300) {
        this.renderer.addClass(mainNav, 'sticky');
      } else {
        this.renderer.removeClass(mainNav, 'sticky');
      }
    });

    const mobileToggle = this.el.nativeElement.querySelector('.mobile-toggle');
    mobileToggle.addEventListener('click', () => {
      const mainNav = this.el.nativeElement.querySelector('.main_nav');
      if (mainNav.classList.contains('open-nav')) {
        this.renderer.removeClass(mainNav, 'open-nav');
      } else {
        this.renderer.addClass(mainNav, 'open-nav');
      }
    });

    const navLinks = this.el.nativeElement.querySelectorAll('.main_nav li a');
    navLinks.forEach((link: HTMLElement) => {
      link.addEventListener('click', () => {
        const mainNav = this.el.nativeElement.querySelector('.main_nav');
        if (mainNav.classList.contains('open-nav')) {
          this.renderer.removeClass(mainNav, 'open-nav');
        }
      });
    });
  }

  private initSmoothScrolling(): void {
    const smoothScrollLinks = this.el.nativeElement.querySelectorAll('.smoothscroll');
    smoothScrollLinks.forEach((link: HTMLElement) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        if (targetId) {
          const targetElement = this.el.nativeElement.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }

  private initAnimations(): void {
    gsap.from(".heading", { duration: 0.8, opacity: 0, y: 20, delay: 0.2, stagger: 0.4 });
  }
}
