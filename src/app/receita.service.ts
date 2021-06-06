import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Receita } from './model/receita';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {

  private baseURL: string = 'http://localhost:3000/receitas';

  private coleacaoAtualizada = new Subject<Receita[]>();

  //injeção de dependência
  constructor(private httpClient: HttpClient) { }

  public getColecaoAtualizada (){
    return this.coleacaoAtualizada.asObservable();
  }

  public list (){
      this.httpClient.get<{receitas: Receita[]}>(this.baseURL).subscribe( resultado => {
      this.coleacaoAtualizada.next(resultado.receitas);
      console.log(resultado.receitas);
    });
  }

  public add (receita: Receita){
    this.httpClient.post<{receitas: Receita[]}>(this.baseURL, Receita).subscribe (resultado => {
      this.coleacaoAtualizada.next(resultado.receitas);
    })
  }
}
