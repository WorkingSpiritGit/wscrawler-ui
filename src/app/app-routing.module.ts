import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InlogComponent } from './inlog/inlog.component';
import { ZoekschermComponent } from './zoekscherm/zoekscherm.component';
import { AdminAutorisatieGuard } from './guards/adminautorisatie.guard';
import { AccountmanagerAutorisatieGuard } from './guards/accountmanagerautorisatie.guard';
import { AdminComponent } from './admin/admin.component';
import { AccountManagerComponent } from './account-manager/account-manager.component';
import { AccountHomeComponent } from './account-manager/account-home/account-home.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { GebruikersComponent } from './admin/gebruikers/gebruikers.component';
import { WebsitesComponent } from './admin/websites/websites.component';
import { NieuweVacatureComponent } from './account-manager/nieuwe-vacature/nieuwe-vacature.component';
import { ZoektermComponent } from './admin/zoekterm/zoekterm.component';
import { VacatureTabelComponent } from './account-manager/vacature-tabel/vacature-tabel.component';
import { ProfielComponent } from './profiel/profiel.component';
import { VacatureComponent } from './account-manager/vacature/vacature.component';
import { ActiefComponent } from './account-manager/actief/actief.component';
import { ArchiefComponent } from './account-manager/archief/archief.component';

const routes: Routes = [
  { path: 'inloggen', component: InlogComponent },

  { path: 'admin', component: AdminComponent, canActivate: [AdminAutorisatieGuard],
    children: [
      { path: '', component: AdminHomeComponent, canActivate: [AdminAutorisatieGuard],
        children: [
          { path: 'gebruikers', component: GebruikersComponent, canActivate: [AdminAutorisatieGuard] },
          { path: 'websites', component: WebsitesComponent, canActivate: [AdminAutorisatieGuard] },
          { path: 'zoekterm', component: ZoektermComponent, canActivate: [AdminAutorisatieGuard] }
        ]
      },
      { path: 'profiel', component: ProfielComponent, canActivate: [AdminAutorisatieGuard] },
    ]
  },

  { path: 'accountmanager', component: AccountManagerComponent, canActivate: [AccountmanagerAutorisatieGuard],
    children: [
      { path: '', component: AccountHomeComponent, canActivate: [AccountmanagerAutorisatieGuard],
        children: [
          { path: 'nieuw', component: NieuweVacatureComponent, canActivate: [AccountmanagerAutorisatieGuard] },
          { path: 'vacatures', component: VacatureTabelComponent, canActivate: [AccountmanagerAutorisatieGuard] },
          { path: 'actief', component: ActiefComponent, canActivate: [AccountmanagerAutorisatieGuard] },
          { path: 'archief', component: ArchiefComponent, canActivate: [AccountmanagerAutorisatieGuard] },
          { path: 'zoeken', component: ZoekschermComponent, canActivate: [AccountmanagerAutorisatieGuard] },
        ]
      },
      { path: 'vacature/:id', component: VacatureComponent, canActivate: [AccountmanagerAutorisatieGuard] },
      { path: 'profiel', component: ProfielComponent, canActivate: [AccountmanagerAutorisatieGuard] },
    ]
  },

  { path: '', redirectTo: '/inloggen', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
