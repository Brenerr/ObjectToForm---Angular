import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  listForm: FormGroup;

  automation = {
    name: 'Terceira Automacao',
    description: 'Terceira Automacao',
    automationType: 'save-update',
    workspace: '60033a8fa7a9285e35925032',
    table: ['604977bafcf87e0013212c7c','604977bafcf87e0013212c7c'],
    event: {
      eventType: 'isUpdateFor',
      config: {
        dataFor: [
          {
            field: '604977fbfcf87e0013212c81',
            value: 'lucas@teste',
          },
          {
            field: '604977fbfcf87e0013212c81',
            value: 'brener@teste',
          },
        ],
      },
    },
    conditions: [
      {
        condition: 'and',
        operator: 'eq',
        valueType: 'value',
        value: 'lucas.sartori@abas.online',
        field: '604977fbfcf87e0013212c81',
      },
    ],
    action: {
      actionType: 'communication',
      config: {
        eventType: '6075933bf8b0d50013ed1310',
      },
    },
  };

  ngOnInit() {
    this.listForm = this.toFormGroup(
      this.automation,
      Object.keys(this.automation)
    );

    setTimeout(() => {
      console.log(this.listForm);
    }, 1000);
  }

  toFormGroup(item: any, keys: string[]) {
    const group: any = {};
    keys.forEach((key) => {
      if (item[key] instanceof Array) {
        group[key] = (item[key][0] instanceof Object) ? 
        this.toFormArray(item[key]) : new FormControl(item[key]);
      } else if (item[key] instanceof Object) {
        group[key] = this.toFormGroup(item[key], Object.keys(item[key]));
      } else {
        group[key] = new FormControl(item[key], Validators.required);
      }
    });
    return new FormGroup(group);
  }

  toFormArray(items: any[]) {
    let group = new FormArray([]);
    items.forEach((item) => {
      group.push(this.toFormGroup({ ...item }, Object.keys(item)));
    });
    return group;
  }
}
