import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from '@modules/main/main.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {LoginComponent} from '@modules/login/login.component';
import {ProfileComponent} from '@pages/profile/profile.component';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {AuthGuard} from '@guards/auth.guard';
import {NonAuthGuard} from '@guards/non-auth.guard';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {PrivacyPolicyComponent} from '@modules/privacy-policy/privacy-policy.component';
import {MainMenuComponent} from '@pages/main-menu/main-menu.component';
import {SubMenuComponent} from '@pages/main-menu/sub-menu/sub-menu.component';
import { DomaineComponent } from '@pages/domaine/domaine.component';
import { FormationComponent } from '@pages/formation/formation.component';
import { SessionsformationsComponent } from '@pages/sessionsformations/sessionsformations.component';
import { FormateurComponent } from '@pages/formateur/formateur.component';
import { OrganismeComponent } from '@pages/organisme/organisme.component';
import { ProfilComponent } from '@pages/profil/profil.component';
import { ParticipantComponent } from '@pages/participant/participant.component';
import { PaysComponent } from '@pages/pays/pays.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'blank',
                component: BlankComponent
            },
            {
                path: 'sub-menu-1',
                component: SubMenuComponent
            },
            {
                path: 'sub-menu-2',
                component: BlankComponent
            },
            {
                path: 'domaine',
                component: DomaineComponent
            },
            {
                path: 'formation',
                component: FormationComponent
            },
            {
                path: 'organisme',
                component: OrganismeComponent
            },
            {
                path: 'formateur',
                component: FormateurComponent
            },
            {
                path: 'profil',
                component: ProfilComponent
            },
            {
                path: 'participant',
                component: ParticipantComponent
            },
            {
                path: 'pays',
                component: PaysComponent
            },
            {
                path: 'sessionformation',
                component: SessionsformationsComponent
            },
            {
                path: '',
                component: DashboardComponent
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'recover-password',
        component: RecoverPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent,
        canActivate: [NonAuthGuard]
    },
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
