import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente, ClienteResponseDTO, Email } from 'src/app/models/dialog.component.models';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-diaolog',
  templateUrl: './diaolog.component.html',
  styleUrls: ['./diaolog.component.scss']
})
export class DiaologComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<any>;

  isChange!: boolean;
  displayedColumns: string[] = ['categoria', 'nome', 'email', 'actions'];
  dataSource = new MatTableDataSource<Email>();


  tabelaEmail = new FormGroup({
    categoria: new FormControl(null, Validators.required),
    nome: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
  });

  dadosCliente = new FormGroup({
    inscricao: new FormControl(null, Validators.required),
    apelido: new FormControl(null, Validators.required),
    nome: new FormControl(null, Validators.required),
    status: new FormControl(null, Validators.required),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: ClienteResponseDTO,
    public dialogRef: MatDialogRef<DiaologComponent>,
  ) { }

  ngOnInit(): void {
    this.data.cliente.email.forEach(email=>{
      this.dataSource.data.push(email);
    })
    if (this.data.cliente.id != 0) {
      this.isChange = true;
    } else {
      this.isChange = false;
    }

  }

  addDescricaoRejeito() {
    if (this.tabelaEmail.valid) {
      const rowDataTable = this.tabelaEmail.value;
      this.dataSource.data.push(rowDataTable);
      this.table.renderRows();
      this.tabelaEmail.reset();
    }
  }
  deleteClickTabelaEmbalagem(event: any) {
    this.dataSource.data = this.dataSource.data.filter(d => d !== event);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
  confirmDialog(): void {
    if(this.dadosCliente.valid){
      const cliente:Cliente = new Cliente();
      cliente.apelido = this.dadosCliente.controls['apelido'].value;
      cliente.inscricao = this.dadosCliente.controls['inscricao'].value;
      cliente.nome = this.dadosCliente.controls['nome'].value;
      cliente.status = this.dadosCliente.controls['status'].value;
      cliente.email = this.dataSource.data;
      cliente.id = this.data.cliente.id;
      this.dialogRef.close(cliente);
    }
  }
}
