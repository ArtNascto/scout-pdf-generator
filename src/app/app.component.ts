import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { PDFDocument, PDFPage } from 'pdf-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  leaderDataSource = new MatTableDataSource<SelectDto>();
  supportDataSource = new MatTableDataSource<SelectDto>();
  @ViewChild('invoice') invoiceElement!: ElementRef;
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
  ];
  anotherEvents: Array<string> = [
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
  objective: string = '';
  placeName: string = '';
  address: string = '';
  participantsNumber: number = 0;
  supportNumber: number = 0;
  tempLeaderName: string = '';
  tempSupportName: string = '';
  faPlus = faPlus;
  leaders: Array<SelectDto> = [];
  supports: Array<SelectDto> = [];
  selectedSession: string = '  ';
  responsible: string = '';
  selectedActivityType: any;
  displayedLeadersColumns: string[] = ['Nome'];
  displayedSupportColumns: string[] = ['Nome'];
  outDate: moment.Moment | null = null;
  outHour: string = '';
  outTransportation: string = '';
  benefited: number = 0;
  returnDate: moment.Moment | null = null;
  returnHour: string = '';
  returnTransportation: string = '';
  taxes: number | null = null;
  takeFood: boolean = false;
  notes: string = '';

  activityProgramation: File | null = null;
  activityProgramationBuffer: any;

  solicitationDate: moment.Moment | null = null;

  print: boolean = true;

  constructor(private _cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.activitiesList.forEach((activity) => {
      this.activities.push({
        name: activity,
        value: activity,
      });
    });
  }
  addLeader() {
    this.leaders.push({
      name: this.tempLeaderName,
      value: this.tempLeaderName,
    });
    this.leaderDataSource.data = this.leaders;
    this.tempLeaderName = '';
    this._cdr.detectChanges();
  }
  addSupport() {
    this.supports.push({
      name: this.tempSupportName,
      value: this.tempSupportName,
    });
    this.supportDataSource.data = this.supports;
    this.tempSupportName = '';
    this._cdr.detectChanges();
  }
  setOutDate(event: any) {
    if (event) this.outDate = moment(event.value);
  }
  setReturnDate(event: any) {
    if (event) this.returnDate = moment(event.value);
  }
  setSolicitationDate(event: any) {
    if (event) this.solicitationDate = moment(event.value);
  }
  formatMoney(money: number | null): string {
    if (money) return `R$ ${money?.toFixed(2).toString().replace('.', ',')}`;
    else {
      return 'R$ 0,0';
    }
  }
  async onChangeActivityProgramation(event: any) {
    this.activityProgramation = event.target.files[0];
    if (this.activityProgramation) {
      this.activityProgramationBuffer =
        await this.activityProgramation?.arrayBuffer();
    }
  }
  save() {}

  generatePDF(): void {
    if (this.verifyData()) {
      this.print = true;

      this._cdr.detectChanges();
      html2canvas(this.invoiceElement.nativeElement, { scale: 1 }).then(
        async (canvas) => {
          let fileName =
            'solicitação_' +
            this.selectedActivityType +
            '_' +
            this.selectedSession +
            '_' +
            '.pdf';
          const imageGeneratedFromTemplate = canvas.toDataURL('image/png');
          const fileWidth = 215;
          const generatedImageHeight =
            (canvas.height * fileWidth) / canvas.width;
          let PDF = new jsPDF('portrait', 'mm', 'a4');
          PDF.addImage(
            imageGeneratedFromTemplate,
            'PNG',
            0,
            5,
            fileWidth,
            generatedImageHeight
          );
          PDF.html(this.invoiceElement.nativeElement.innerHTML);
          const solicitation = PDF.output('arraybuffer');
          // PDF.save(fileName)
          const merged = await this.mergePdfs([
            solicitation,
            this.activityProgramationBuffer,
          ]);
          console.log(merged);
          var blob = new Blob([merged], { type: 'application/pdf' });
          var link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = fileName;
          link.click();
          this.print = false;
          window.location.reload();
        }
      );
    }
  }

  async mergePdfs(pdfsToMerge: ArrayBuffer[]): Promise<ArrayBufferLike> {
    const mergedPdf: PDFDocument = await PDFDocument.create();

    const createInnerPromise = async (
      arrayBuffer: ArrayBuffer
    ): Promise<PDFPage[]> => {
      const pdf: PDFDocument = await PDFDocument.load(arrayBuffer);
      return await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    };

    const outerPromise: Promise<PDFPage[]>[] = pdfsToMerge.map(
      (arrayBuffer) => {
        const innerPromise: Promise<PDFPage[]> =
          createInnerPromise(arrayBuffer);
        return innerPromise;
      }
    );

    const resultOuterPromise: PDFPage[][] = await Promise.all(outerPromise);

    resultOuterPromise.forEach((pageArray: PDFPage[]) => {
      pageArray.forEach((page: PDFPage) => {
        mergedPdf.addPage(page);
      });
    });

    return (await mergedPdf.save()).buffer;
  }

  verifyData(): boolean {
    return (
      this.selectedSession?.trim() != '' &&
      this.responsible?.trim() != '' &&
      this.selectedActivityType?.trim() != '' &&
      this.objective?.trim() != '' &&
      this.placeName?.trim() != '' &&
      this.address?.trim() != '' &&
      this.outDate != null &&
      this.outTransportation?.trim() != '' &&
      this.outHour?.trim() != '' &&
      this.returnDate != null &&
      this.returnHour?.trim() != '' &&
      this.returnTransportation?.trim() != '' &&
      this.participantsNumber > 0 &&
      this.leaders.length > 0 &&
      this.solicitationDate != null
    );
  }
}
export class SelectDto {
  name: string = '';
  value: string = '';
}
