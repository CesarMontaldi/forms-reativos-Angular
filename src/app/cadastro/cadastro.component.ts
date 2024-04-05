import { ConsultaCepService } from './../service/consulta-cep.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(
    private router: Router, 
    private consultaCepService: ConsultaCepService) { }

  ngOnInit(): void {
  }

  cadastrar(form: NgForm){
    if (form.valid) {
      this.router.navigate(["./sucesso"])
    } else {
      alert("Formulário inválido!");
    }
      console.log(form);
  }

  consultaCep(event: any, f: NgForm) {
    const cep = event.target.value;
    if (cep !== "") {
      this.consultaCepService.getConsultaCep(cep).
      subscribe((result) => {
        this.getEndereco(result, f)
      });       
    } 
  }

  getEndereco(dados: any, f: NgForm) {
    f.form.patchValue({
      endereco: dados.logradouro,
      complemento: dados.complento,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf
    })
  }
}
