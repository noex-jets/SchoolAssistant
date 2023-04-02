import { AddLessonModalPage } from './../../modals/add-lesson-modal/add-lesson-modal.page';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  selector: 'app-searchable-select',
  templateUrl: './searchable-select.component.html',
  styleUrls: ['./searchable-select.component.scss'],
})
export class SearchableSelectComponent implements OnInit {

  @Input() title: string = 'Search';
  @Input() data: any[];
  @Input() multiple = false;
  @Input() itemTextField = 'name';
  @Input() itemColorField = "#88B5BF";
  @Input() placeholderColor;
  @Input() placeholderText;
  @Input() addLessonButton: boolean = false;
  @Input() cancelButton: boolean = true;

  @Output() selectedChanged: EventEmitter<any> = new EventEmitter();

  isOpen = false;
  selected = [];

  constructor(
    private modalController: ModalController,

  ) { }

  ngOnInit() {
    console.log(this.data)
  }

  ionViewWillEnter() {
    console.log(this.data)
  }

  open() {
    this.isOpen = true;
    this.data.map((item) => (item.selected = false));
  }

  cancel() {
    this.isOpen = false;
    this.selected = []
    this.selectedChanged.emit(this.selected)
  }

  select() {
    this.isOpen = false;
  }

  itemSelected() {
    this.selected = this.data.filter((item) => item.selected);

    if(!this.multiple){
      this.selectedChanged.emit(this.selected)
      this.isOpen = false;
    }
  }

  leafName = (obj) => this.itemTextField.split('.').reduce((value, el) => value[el], obj);

  leafColor = (obj) => this.itemColorField.split('.').reduce((value, el) => value[el], obj);

  async openAddLessonModal() {
    const modal = await this.modalController.create({
      component: AddLessonModalPage
    })

    modal.present()

  }

}
