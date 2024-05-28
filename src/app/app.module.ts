import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { VideoGameNewsComponent } from '../components/video-game-news/video-game-news.component';
import { MatchmakingComponent } from '../components/matchmaking/matchmaking.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { ChatComponent } from '../components/chat/chat.component';
import { AboutUsComponent } from '../components/about-us/about-us.component';
import { TermsAndConditionsComponent } from '../components/terms-and-conditions/terms-and-conditions.component';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../services/auth.guard';
import { SafeHtmlPipe } from './../pipes/safe-html.pipe';
import { VideoGamesProfileComponent } from '../components/video-games-profile/video-games-profile.component';
import { VideoGamesAvailableComponent } from '../components/video-games-available/video-games-available.component';
import { StreamChatModule, StreamAutocompleteTextareaModule } from 'stream-chat-angular';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    VideoGameNewsComponent,
    MatchmakingComponent,
    ProfileComponent,
    ChatComponent,
    AboutUsComponent,
    TermsAndConditionsComponent,
    SafeHtmlPipe,
    VideoGamesProfileComponent,
    VideoGamesAvailableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatStepperModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    StreamAutocompleteTextareaModule,
    StreamChatModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule { }
