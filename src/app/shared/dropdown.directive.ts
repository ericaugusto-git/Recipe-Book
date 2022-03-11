import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  show: boolean = true;
  // @HostListener('click')
  // appDropdown(event: Event){
  //   if(this.show){
  //     this.renderer.addClass(this.elementRef.nativeElement.nextElementSibling, 'show');
  //   }else{
  //     this.renderer.removeClass(this.elementRef.nativeElement.nextElementSibling, 'show');
  //   }
  //   this.show = !this.show;
  // }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

}
