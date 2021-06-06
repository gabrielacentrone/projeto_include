import { Component, OnInit } from '@angular/core';
import { Receita } from './model/receita';
import { ReceitaService } from './receita.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

receitas: Receita[]=[];
dados: any;

opcoes = [
  {rotulo: "Despesa", valor: false},
  {rotulo: "Receita", valor: true}
]

constructor(private receitaService: ReceitaService){

}

ngOnInit(){
  this.receitaService.getColecaoAtualizada().subscribe(receitas => {
    this.receitas = receitas;
    this.atualizarGrafico();
  })
  this.receitaService.list();
}

atualizarGrafico(){
  const receitas = this.receitas.filter(r => r.finalizada).length;
  const despesas = this.receitas.length - receitas;
  this.dados = {
    labels: ["Receitas", "Despesas"],
    datasets: [
      {
        data: [receitas, despesas],
        backgroundColor: [
          '#2196F3',
          '#F44336'
        ]
      }
    ]
  }
}


  adicionar (receitaForm){
    const r: Receita={
      descricao:receitaForm.value.receita,
      finalizada: false
    }
    //this.receitas.push(r);
    this.receitaService.add(r);
    receitaForm.resetForm();
    //console.log(receitaForm);
  }
}