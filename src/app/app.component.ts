import { Component } from '@angular/core';
import { Todo } from 'src/models/todo.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //public todos: any[] = [];
  public todos: Todo[] = [];
  public title: String = 'Minhas Atividadades';
  public form: FormGroup;

  //Inicializar a tela
  constructor(private fb: FormBuilder) {
    //Forms e Validators
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required,
      ])]
    });

    this.carregar();

    //Inclui um item na lista
    /*
    this.todos.push(new Todo(1, 'Passear com o cachorro', false));
    this.todos.push(new Todo(2, 'Ir ao supermercado', false));
    this.todos.push(new Todo(3, 'Cortar o cabelo', true));
    */
  }

  //Funções
  alterarTexto() {
    this.title = 'Alterado com Sucesso!'
  }

  adicionar() {
    //this.form.value
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    console.log(id)

    this.todos.push(new Todo(id, title, false));
    this.salvar();
    this.limpar();
  }

  limpar() {
    this.form.reset();
  }

  remover(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index != -1) {
      this.todos.splice(index, 1);
      this.salvar();

    }
  }

  marcar(todo: Todo) {
    todo.done = true;
    this.salvar();
  }

  desmarcar(todo: Todo) {
    todo.done = false;
    this.salvar();
  }

  //Persistencia com JSon
  salvar() {
    const data = JSON.stringify(this.todos)
    localStorage.setItem('todos', data);
  }

  carregar() {
    const data = localStorage.getItem('todos');
    const items = JSON.parse(data);
    this.todos = items;
  }

}
