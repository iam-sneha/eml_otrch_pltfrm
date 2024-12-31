import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { TemplateEditorComponent } from './template-editor/template-editor.component';
import { CsvUploadComponent } from './csv-upload/csv-upload.component';
import { EmailFormComponent } from './email-form/email-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogsComponent } from './logs/logs.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'signup', component: SignupComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'CsvUpload', component: CsvUploadComponent, pathMatch: 'full' },
  {
    path: 'templateEditor',
    component: TemplateEditorComponent,
    pathMatch: 'full',
  },
  { path: 'EmailForm', component: EmailFormComponent, pathMatch: 'full' },
  { path: 'Dashboard', component: DashboardComponent, pathMatch: 'full' },
  { path: 'Logs', component: LogsComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
