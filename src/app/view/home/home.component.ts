import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Cliente, ClienteResponseDTO, Page } from 'src/app/models/dialog.component.models';
import { CrudService } from 'src/app/service/crud.service';
import { DiaologComponent } from 'src/app/view/diaolog/diaolog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  pageEvent: PageEvent;
  page: Page<Cliente> =  new Page([],0);
  displayedColumns: string[] = ['inscricao', 'apelido', 'nome', 'status', 'actions'];
  dataSource = new MatTableDataSource<Cliente>();

  constructor(public dialog: MatDialog, private crudService: CrudService) {
  }

  ngOnInit(): void {
    this.refreshTable();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  refreshTable(){
    this.crudService.listClient(
      this.pageEvent ? this.pageEvent.pageIndex:0,
      this.pageEvent ? this.pageEvent.pageSize:5
    ).subscribe(page => {
      this.page = page;
    });

  }

  openDialog(element: ClienteResponseDTO | null): void {
    const dialogRef = this.dialog.open(DiaologComponent, {
      width: '900px',
      data: element === null ? {
        cliente:{
          nome: '',
          inscricao: null,
          apelido: null,
          status: '',
          email:[],
          id:0,
        },
        urlImage: ''
      } : {
        cliente:{
          nome: element.cliente.nome,
          inscricao: element.cliente.inscricao,
          apelido: element.cliente.apelido,
          status: element.cliente.status,
          email: element.cliente.email,
          id:element.cliente.id,
        },
        urlImage:element.urlImage
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result !== null) {
        this.crudService.createClient(result).subscribe((res)=>{
          this.refreshTable();
        });
      }
    });
  }

  deleteElement(id: number): void {
    this.crudService.deleteClient(id).subscribe((res)=>{
      this.refreshTable();
    });
  }

  editElement(id: number): void {
    this.crudService.getClient(id).subscribe(result=>{
      this.openDialog(result);
    });
  }

}
