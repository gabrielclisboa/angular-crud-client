export class Email{
  categoria = null;
  nome = null;
  email = null;
  id = 0;
}
export class Cliente{
  inscricao = null;
  apelido = null;
  nome = null;
  status = null;
  email:Email[] = [];
  id = 0;
}

export class ClienteResponseDTO{
  cliente:Cliente = new Cliente();
  urlImage =  "";
}

export class Page<T>{
  constructor(public content: T[], public totalElement:number){}

  static fromResponse<T>(response:any){
    return new Page<T>(response.body.content, parseInt(response.body.totalElements));
  }
}
