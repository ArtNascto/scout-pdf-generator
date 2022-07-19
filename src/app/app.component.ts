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
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { NotyfToast } from './notyf.toast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  leaderDataSource = new MatTableDataSource<SelectDto>();
  supportDataSource = new MatTableDataSource<SelectDto>();
  desktop: boolean = true;
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
    'Trans. Público',
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
  outDate: Date | null = null;
  outHour: string = '';
  outTransportation: string = '';
  benefited: number = 0;
  returnDate: Date | null = null;
  returnHour: string = '';
  returnTransportation: string = '';
  taxes: number | null = null;
  takeFood: boolean = false;
  notes: string = '';

  activityProgramation: File | null = null;
  activityProgramationBuffer: any;

  solicitationDate: Date | null = null;

  print: boolean = true;

  @ViewChild('downloadMessage')
  downloadMessage!: SwalComponent;

  constructor(private _cdr: ChangeDetectorRef, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.activitiesList.forEach((activity) => {
      this.activities.push({
        name: activity,
        value: activity,
      });
    });
    this.desktop = !this.mobileCheck();

    this.getSavedData();
  }
  async getSavedData() {
    const selected_session = localStorage.getItem('selected_session');
    if (selected_session) {
      this.selectedSession = selected_session;
    }

    const responsible = localStorage.getItem('responsible');
    if (responsible) {
      this.responsible = responsible;
    }

    const selected_activity_type = localStorage.getItem(
      'selected_activity_type'
    );
    if (selected_activity_type) {
      this.selectedActivityType = selected_activity_type;
    }

    const objective = localStorage.getItem('objective');
    if (objective) {
      this.objective = objective;
    }

    const place_name = localStorage.getItem('place_name');
    if (place_name) {
      this.placeName = place_name;
    }

    const address = localStorage.getItem('address');
    if (address) {
      this.address = address;
    }
    const out_date = localStorage.getItem('out_date');
    if (out_date) {
      this.outDate = new Date(out_date);
    }

    const out_transportation = localStorage.getItem('out_transportation');
    if (out_transportation) {
      this.outTransportation = out_transportation;
    }

    const out_hour = localStorage.getItem('out_hour');
    if (out_hour) {
      this.outHour = out_hour;
    }

    const return_date = localStorage.getItem('return_date');
    if (return_date) {
      this.returnDate = new Date(return_date);
    }

    const return_hour = localStorage.getItem('return_hour');
    if (return_hour) {
      this.returnHour = return_hour;
    }

    const return_transportation = localStorage.getItem('return_transportation');
    if (return_transportation) {
      this.returnTransportation = return_transportation;
    }

    const participants_number = localStorage.getItem('participants_number');
    if (participants_number) {
      this.participantsNumber = Number.parseInt(participants_number);
    }

    const leaders = localStorage.getItem('leaders');
    if (leaders) {
      this.leaders = JSON.parse(leaders);
      this.leaderDataSource.data = this.leaders;
    }
    const supports = localStorage.getItem('supports');
    if (supports) {
      this.supports = JSON.parse(supports);
      this.supportDataSource.data = this.supports;
    }

    const solicitation_date = localStorage.getItem('solicitation_date');
    if (solicitation_date) {
      this.solicitationDate = new Date(solicitation_date);
    }

    const taxes = localStorage.getItem('taxes');
    if (taxes) {
      this.taxes = Number.parseFloat(taxes);
    }

    const notes = localStorage.getItem('notes');
    if (notes) {
      this.notes = notes;
    }

    const takeFood = localStorage.getItem('take_food');
    if (takeFood) {
      this.takeFood = takeFood == 'true' ? true : false;
    }

    const activity_programation = localStorage.getItem('activity_programation');
    if (activity_programation) {
      this.activityProgramation = await this.base64ToFile(
        activity_programation
      );
      this.activityProgramationBuffer =
        this.activityProgramation?.arrayBuffer();
    }
    this._cdr.detectChanges();
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
    if (event) this.outDate = new Date(event.value);
  }

  setReturnDate(event: any) {
    if (event) this.returnDate = new Date(event.value);
  }

  setSolicitationDate(event: any) {
    if (event) this.solicitationDate = new Date(event.value);
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
  clear() {
    localStorage.clear();
    this.toastr.success('', 'Dados limpos!', {
      enableHtml: true,
      tapToDismiss: true,
      toastComponent: NotyfToast,
      toastClass: 'notyf confirm',
    });
  }
  async save() {
    if (this.selectedSession?.trim())
      localStorage.setItem('selected_session', this.selectedSession);

    if (this.responsible?.trim())
      localStorage.setItem('responsible', this.responsible);

    if (this.selectedActivityType?.trim())
      localStorage.setItem('selected_activity_type', this.selectedActivityType);

    if (this.objective?.trim())
      localStorage.setItem('objective', this.objective);

    if (this.placeName?.trim())
      localStorage.setItem('place_name', this.placeName);

    if (this.address?.trim()) localStorage.setItem('address', this.address);

    if (this.outDate) {
      let date: Date = this.outDate;
      localStorage.setItem('out_date', date.toString());
    }

    if (this.outTransportation?.trim())
      localStorage.setItem('out_transportation', this.outTransportation);

    if (this.outHour?.trim()) localStorage.setItem('out_hour', this.outHour);

    if (this.returnDate) {
      let date: Date = this.returnDate;
      localStorage.setItem('return_date', date.toString());
    }

    if (this.returnHour?.trim())
      localStorage.setItem('return_hour', this.returnHour);

    if (this.returnTransportation?.trim())
      localStorage.setItem('return_transportation', this.returnTransportation);

    if (this.participantsNumber > 0)
      localStorage.setItem(
        'participants_number',
        this.participantsNumber.toString()
      );

    if (this.leaders && this.leaders.length > 0)
      localStorage.setItem('leaders', JSON.stringify(this.leaders));

    if (this.supports && this.supports.length > 0)
      localStorage.setItem('supports', JSON.stringify(this.supports));

    if (this.solicitationDate) {
      let date: Date = this.solicitationDate;
      localStorage.setItem('solicitation_date', date.toString());
    }

    if (this.taxes && this.taxes > 0) {
      localStorage.setItem('taxes', this.taxes.toString());
    }

    if (this.notes) {
      localStorage.setItem('notes', this.notes);
    }

    if (this.takeFood) {
      localStorage.setItem('take_food', this.takeFood ? 'true' : 'false');
    }

    if (this.activityProgramation) {
      let base64: string = await this.convertToBase64(
        this.activityProgramation
      );
      localStorage.setItem('activity_programation', base64);
    }

    this.toastr.success('', 'Dados armazenados!', {
      enableHtml: true,
      tapToDismiss: true,
      toastComponent: NotyfToast,
      toastClass: 'notyf confirm',
    });
  }
  convertToBase64(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result?.toString());
      reader.onerror = (error) => reject(error);
    });
  }
  async base64ToFile(base64: string): Promise<File> {
    const res = await fetch(base64);
    const buf = await res.arrayBuffer();
    return new File([buf], 'solicitação.pdf', { type: 'application/pdf' });
  }
  mobileCheck() {
    let check = false;
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substring(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor);
    return check;
  }

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
          var blob = new Blob([merged], { type: 'application/pdf' });
          var link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = fileName;
          link.click();
          this.print = false;
          this.downloadMessage.fire().then((data) => {
            if (data.isConfirmed) {
              window.location.reload();
            }
          });
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
