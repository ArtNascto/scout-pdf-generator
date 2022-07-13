import { Component, ElementRef, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-root',
  templateUrl: './pdf-generated.component.html',
  styleUrls: ['./pdf-generated.component.scss'],
})
export class PdfGeneratedComponent {
  eventType: Array<string> = [
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
  sessions: Array<string> = [
    'Alcateia',
    'Tropa Escoteira',
    'Tropa Senior',
    'Clã Pioneiro',
  ];

  constructor() {}

  ngOnInit(): void {}
}
