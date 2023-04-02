import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'home',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'homeworks',
        loadChildren: () => import('../homeworks/homeworks.module').then(m => m.HomeworksPageModule)
      },
      {
        path: 'grades',
        loadChildren: () => import('../grades/grades.module').then(m => m.GradesPageModule)
      },
      {
        path: 'timetable',
        loadChildren: () => import('../timetable/timetable.module').then(m => m.TimetablePageModule)
      },
      {
        path: 'subjects',
        loadChildren: () => import('../subjects/subjects.module').then(m => m.SubjectsPageModule)
      },
      {
        path: '',
        redirectTo: 'home/dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'home/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
