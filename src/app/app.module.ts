import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { TemplateEditorComponent } from './template-editor/template-editor.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { QuillModule } from 'ngx-quill';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CsvUploadComponent } from './csv-upload/csv-upload.component';
import { environment } from '../../src/environment';
import { EmailFormComponent } from './email-form/email-form.component';
import { BootstrapOptions } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmailService } from './email.service';
import { LogsComponent } from './logs/logs.component';

@NgModule({
  imports: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    CsvUploadComponent,
    TemplateEditorComponent,
    DashboardComponent,
    LogsComponent,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    QuillModule.forRoot(),
    NgxCsvParserModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
    EmailFormComponent,
  ],

  providers: [provideAnimationsAsync(), EmailService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  // bootstrap: [AppComponent],
  // declarations: [
  //   AppComponent,
  //   CsvUploadComponent,
  //   TemplateEditorComponent,
  // ],
})
export class AppModule {
  ngDoBootstrap(appRef: ApplicationRef) {
    if (environment.production) {
      appRef.bootstrap(AppComponent); // Bootstraps in production mode
    } else {
      // Bootstrapping in development mode with extra logic
      console.log('App is bootstrapping in development mode');
      appRef.bootstrap(AppComponent);
    }
  }
}
