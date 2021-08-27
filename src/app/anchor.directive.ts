import {Directive, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';

@Directive({
  selector: '[appAnchor]'
})
export class AnchorDirective implements OnInit {
  @Input()
  appAnchor: HTMLElement;
  @Input()
  scrolledContainer: HTMLElement;
  @Output()
  onScrolled = new EventEmitter();

  @HostListener('click', ['$event']) onClick($event){
    this.appAnchor.scrollIntoView({behavior: 'smooth'});
  }

  constructor() {

  }

  ngOnInit(): void {
    if (this.scrolledContainer) {
      this.scrolledContainer.addEventListener('scroll', () => {
        const elementPosition = this.appAnchor.offsetTop - this.scrolledContainer.offsetTop - 30;
        const elementHeight = this.appAnchor.offsetHeight;
        const scrollPosition = this.scrolledContainer.scrollTop;

        if (scrollPosition > elementPosition && scrollPosition < elementHeight + elementPosition) {
          this.onScrolled.emit();
        }
      })
    }
  }

}
