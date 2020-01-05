import { NgModule } from '@angular/core';
import { NgzorroSharedLibsModule } from './shared-libs.module';
import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { JhiAlertComponent } from './alert/alert.component';
import { JhiAlertErrorComponent } from './alert/alert-error.component';
import { JhiLoginModalComponent } from './login/login.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule, NZ_ICON_DEFAULT_TWOTONE_COLOR, NZ_ICONS } from 'ng-zorro-antd/icon';
import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  BarChartOutline,
  UserAddOutline,
  UnorderedListOutline,
  UserOutline,
  DashboardOutline,
  HeartOutline,
  AlertOutline,
  BellOutline,
  CodeOutline,
  BookOutline,
  FlagOutline,
  ToolOutline,
  LockOutline,
  LogoutOutline,
  DatabaseOutline,
  PlusOutline,
  EyeOutline,
  EditOutline,
  DeleteOutline
} from '@ant-design/icons-angular/icons';
// eslint-disable-next-line @typescript-eslint/camelcase
import { NZ_I18N, pt_BR } from 'ng-zorro-antd';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const icons: IconDefinition[] = [
  MenuFoldOutline,
  MenuUnfoldOutline,
  BarChartOutline,
  UserAddOutline,
  UnorderedListOutline,
  UserOutline,
  DashboardOutline,
  HeartOutline,
  AlertOutline,
  BellOutline,
  CodeOutline,
  BookOutline,
  FlagOutline,
  ToolOutline,
  LockOutline,
  LogoutOutline,
  DatabaseOutline,
  PlusOutline,
  EyeOutline,
  EditOutline,
  DeleteOutline
];

@NgModule({
  imports: [NgzorroSharedLibsModule, NzIconModule],
  declarations: [FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent, JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [
    NzIconModule,
    NgzorroSharedLibsModule,
    FindLanguageFromKeyPipe,
    JhiAlertComponent,
    JhiAlertErrorComponent,
    JhiLoginModalComponent,
    HasAnyAuthorityDirective
  ],
  providers: [
    { provide: NZ_ICON_DEFAULT_TWOTONE_COLOR, useValue: '#00ff00' }, // If not provided, Ant Design's official blue would be used
    { provide: NZ_ICONS, useValue: icons },
    // eslint-disable-next-line @typescript-eslint/camelcase
    { provide: NZ_I18N, useValue: pt_BR }
  ]
})
export class NgzorroSharedModule {}
