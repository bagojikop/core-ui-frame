import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  BadgeComponent,
  ButtonDirective,
  CollapseDirective,
  IColumn,
  SmartTableComponent,
  TemplateIdDirective,
  TextColorDirective
} from '@coreui/angular-pro';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; // Import SweetAlert2

@Component({
  selector: 'app-dss-grid',
  templateUrl: './dss-grid.component.html',
  styleUrls: ['./dss-grid.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [BadgeComponent, CommonModule, HttpClientModule, ButtonDirective, CollapseDirective, SmartTableComponent, TemplateIdDirective, TextColorDirective],
})
export class DssGridComponent {
  accountList: any[] = [];
  pageDetails = {
    currentPage: 1,
    pageSize:25,
    totalPages: 0,
    totalCount: 0,
    hasNext: false,
    hasPrevious: false
  };
  isLoading = false;
  errorMessage = '';

  columns: IColumn[] = [
    { key: 'accName', label: 'Account Name' },
    { key: 'sgName', label: 'Subgroup Name' },
    { key: 'accAlias', label: 'Account Alias', _props: { class: 'text-truncate' } },
    { key: 'action', label: 'Actions', filter: false, sorter: false },
  ];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.fetchAccounts();
  }

  fetchAccounts(): void {
    const body = {
      pageNumber: this.pageDetails.currentPage,
      pageSize: this.pageDetails.pageSize,
    };

    this.isLoading = true;
    this.http.post<any>('http://localhost:5267/Account/getList', body).subscribe({
      next: (response) => {
        this.accountList = response.data.map((account: any) => ({
          accName: account.accName,
          sgName: account.sgCodeNavigation?.sgName || 'N/A',
          accAlias: account.accPanDetail?.accPanNo || 'N/A',
          id: account.accCode,
        }));
        this.pageDetails = response.pageDetails
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching accounts:', error);
        this.errorMessage = 'Failed to load accounts.';
        this.isLoading = false;
      },
    });
  }

  editAccount(id: number): void {
    console.log(`Editing account with ID: ${id}`);
    this.router.navigate(['add']);
  }

  deleteAccount(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        const params = { id: id };

        this.http.delete('http://localhost:5267/Account/delete', { body: params }).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'The account has been deleted.', 'success');
            this.fetchAccounts(); // Refresh data after deletion
          },
          error: (error) => {
            console.error('Error deleting account:', error);
            Swal.fire('Error!', 'Failed to delete the account.', 'error');
          },
        });
      }
    });
  }
}
