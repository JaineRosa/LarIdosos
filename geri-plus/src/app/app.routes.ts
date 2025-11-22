import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Sobre } from './pages/sobre/sobre';
import { Dashboard } from './pages/admin-dashboard/dashboard/dashboard';
import { PainelIdoso } from './pages/painel-idoso/painel-idoso';

// Guards
import { authGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { AdminLayout } from './pages/admin-dashboard/components/admin-layout/admin-layout';

export const routes: Routes = [
   { path: '', component: Home }, // rota raiz com navbar e footer
  { path: 'login', component: Login }, // sem navbar e footer
  { path: 'sobre', component: Sobre }, // rota para "Sobre Nós"

  // 🔹 Admin Dashboard
  {
    path: 'admin',
    canActivate: [authGuard, RoleGuard],
    component: AdminLayout,
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
      },
      {
        path: 'cadastros/idoso',
        loadComponent: () =>
          import('./pages/admin-dashboard/cadastros/idoso/idoso').then((m) => m.Idoso),
      },
      {
        path: 'cadastros/responsavel',
        loadComponent: () =>
          import('./pages/admin-dashboard/cadastros/responsavel/responsavel').then(
            (m) => m.Responsavel
          ),
      },
      {
        path: 'cadastros/cuidador',
        loadComponent: () =>
          import('./pages/admin-dashboard/cadastros/cuidador/cuidador').then((m) => m.Cuidador),
      },
      {
        path: 'cadastros/visitante',
        loadComponent: () =>
          import('./pages/admin-dashboard/cadastros/visitante/visitante').then((m) => m.Visitante),
      },
      {
        path: 'cadastros/medico',
        loadComponent: () =>
          import('./pages/admin-dashboard/cadastros/medico/medico').then((m) => m.Medico),
      },
      {
        path: 'cadastros/medicamento',
        loadComponent: () =>
          import('./pages/admin-dashboard/cadastros/medicamento/medicamento').then(
            (m) => m.Medicamento
          ),
      },
      {
        path: 'cadastros/admin',
        loadComponent: () =>
          import('./pages/admin-dashboard/cadastros/admin/admin').then((m) => m.Admin),
      },
      {
        path: 'prescricoes-medicas',
        loadComponent: () =>
          import('./pages/admin-dashboard/prescricoes-medicas/prescricoes-medicas').then(
            (m) => m.PrescricoesMedicas
          ),
      },
      {
        path: 'registro-diario',
        loadComponent: () =>
          import('./pages/admin-dashboard/registro-diario/registro-diario').then(
            (m) => m.RegistroDiario
          ),
      },
      {
        path: 'notificacoes',
        loadComponent: () =>
          import('./pages/admin-dashboard/notificacoes/notificacoes').then((m) => m.Notificacoes),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full', // <-- redireciona /admin para /admin/dashboard
      },
    ],
  },

  // 🔹 Painel do Idoso
  {
    path: 'painel-idoso/:id',
    component: PainelIdoso,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dados', pathMatch: 'full' },
      {
        path: 'dados',
        loadComponent: () =>
          import('./pages/painel-idoso/dados-gerais/dados-gerais').then((m) => m.DadosGerais),
      },
      {
        path: 'medicamentos',
        loadComponent: () =>
          import('./pages/painel-idoso/medicamentos/medicamentos').then((m) => m.Medicamentos),
      },
      {
        path: 'recomendacoes',
        loadComponent: () =>
          import('./pages/painel-idoso/recomendacoes-medicas/recomendacoes-medicas').then(
            (m) => m.RecomendacoesMedicas
          ),
      },
      {
        path: 'notificacoes',
        loadComponent: () =>
          import('./pages/painel-idoso/notificacoes/notificacoes').then((m) => m.Notificacoes),
      },
      {
        path: 'cuidadores',
        loadComponent: () =>
          import('./pages/painel-idoso/cuidadores/cuidadores').then((m) => m.Cuidadores),
      },
    ],
  },

  { path: '**', redirectTo: '' },
];