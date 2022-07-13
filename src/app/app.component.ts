import { Component, ElementRef, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('invoice') invoiceElement!: ElementRef;
  activitiesList: Array<string> = [
    'Acampamento',
    'Acantonamento',
    'Excursão',
    'Jornada',
    'At. Divulgação',
    'At. Ecológica',
    'At. Social',
    'Passeio',
    'At. Comunitária',
    'Outras',
    'Assembléia',
    'Atividade Aquática',
    'Atividade Cívica',
    'Atividade Cultural',
    'Atividade de Grupo',
    'Atividade de Patrulha',
    'Atividade de Ramo',
    'Atividade Distrital',
    'Atividade Espiritual Atividade',
    'Esportiva',
    'Atividades de Especialidades',
    'Aventura Sênior',
    'Bivaque',
    'Boa Ação',
    'Caminhada',
    'Campanha Financeira',
    'Congresso',
    'Corrida de Aventura',
    'Curso',
    'Debate',
    'Elo Nacional',
    'Escalada',
    'Espeleologia',
    'Festa',
    'Fogo de Conselho',
    'Fórum',
    'Gincana',
    'Grande Jogo',
    'Indaba',
    'Jamboree',
    'Jogo da Cidade',
    'Jota',
    'Joti',
    'Jota / Joti',
    'Lamparada',
    'Módulo',
    'Mutirão Nac. Ação Comunitária',
    'Mutirão Nac. Ação Ecológica',
    'Mutirão Pioneiro',
    'Oficinas',
    'Palestras',
    'Regata',
    'Reunião especial',
    'Semana do Lobinho',
    'Semana Escoteira',
    'Seminário',
    'Vigília',
    'Visita',
  ];
  transportMode: Array<string> = [
    'A pé',
    'Avião',
    'Bicicleta',
    'Carro',
    'Ônibus',
    'Trem',
    'Outros',
  ];
  activities: Array<SelectDto> = [];
  sessions: Array<string> = [
    'Alcateia',
    'Tropa Escoteira',
    'Tropa Senior',
    'Clã Pioneiro',
  ];
  selectedSession: any;
  responsible: string = '';
  selectedActivityType: any
  constructor() {}

  ngOnInit(): void {

  }
  public generatePDF(): void {
    html2canvas(this.invoiceElement.nativeElement, { scale: 3 }).then(
      (canvas) => {
        const imageGeneratedFromTemplate = canvas.toDataURL('image/png');
        const fileWidth = 200;
        const generatedImageHeight = (canvas.height * fileWidth) / canvas.width;
        let PDF = new jsPDF('p', 'mm', 'a4');
        PDF.addImage(
          imageGeneratedFromTemplate,
          'PNG',
          0,
          5,
          fileWidth,
          generatedImageHeight
        );
        PDF.html(this.invoiceElement.nativeElement.innerHTML);
        PDF.save('solicitação.pdf');
      }
    );
  }
}
export class SelectDto {
  name: string = '';
  value: string = '';
}
