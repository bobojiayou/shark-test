# shark-test

> 为 shark 项目提供搭建测试环境的工具。


## 目录

- [一、安装](#一、安装)
- [二、安装测试相关的依赖](#二、安装测试相关的依赖)
- [三、添加执行测试指令](#三、添加执行测试指令)
- [四、初始化配置文件](#四、初始化配置文件)
- [五、测试工具配置文件说明](#五、测试工具配置文件说明)
- [六、使用](#六、使用)
- [七、FAQ](#七、FAQ)
- [八、angular测试手册](#八、angular测试手册)

## 一、安装

```sh
$ npm install --save-dev shark-test
```
## 二、安装测试相关的依赖

```sh
$ npm install --save classlist
```

```sh
$ npm install --save @types/jasmine
```

## 三、添加执行测试指令

> 在package.json文件中，添加测试指令

```json

{
    "scripts": {
        "test": "./node_modules/shark-test/dist/src/index.js test"
    },
}

```

## 四、初始化配置文件

> 执行以下初始化命令,自动创建四个测试相关的配置文件

```sh

st init

```
或者

```sh

shark-test init

```

## 五、测试工具配置文件说明

在项目根目录下创建配置文件shark-test-conf.json,所有配置项都设了默认值

```json
{
    //项目的源码路径--所有配置基于该路径
    "basePath": "src/main/webapp",
    // 测试入口文件(.spec.ts)
    "main": "test.ts",
    // 测试环境的polyfills
    "polyfills": "polyfills",
    // karma的配置文件
    "configFile": "karma.conf.js",
    // 项目组件目录
    "componentPath": "app",
    // 项目资源
    "assets": ["assets", "favicon.ico"],
    // 项目模板
    "indexTemplate": "index.ejs"
}
```
### 测试入口文件

> 在配置文件中设置的`basePath`路径下添加用于测试入口文件test.ts

```ts

// This file is required by karma.conf.js and loads recursively all the .spec and framework files
import "zone.js/dist/long-stack-trace-zone";
import "zone.js/dist/proxy";
import "zone.js/dist/sync-test";
import "zone.js/dist/jasmine-patch";
import "zone.js/dist/async-test";
import "zone.js/dist/fake-async-test";

import { getTestBed } from '@angular/core/testing';

import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
);
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);

```

### 测试环境的polyfills.ts

> 在配置文件中设置的`basePath`路径下添加用于测试环境的polyfills.ts文件

```ts
/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes Safari >= 10, Chrome >= 55 (including Opera),
 * Edge >= 13 on the desktop, and iOS 10 and Chrome on mobile.
 *
 * Learn more in https://angular.io/docs/ts/latest/guide/browser-support.html
 */

/***************************************************************************************************
 * BROWSER POLYFILLS
 */

/** IE9, IE10 and IE11 requires all of the following polyfills. **/
import 'core-js/es6/symbol';
import 'core-js/es6/object';
import 'core-js/es6/function';
import 'core-js/es6/parse-int';
import 'core-js/es6/parse-float';
import 'core-js/es6/number';
import 'core-js/es6/math';
import 'core-js/es6/string';
import 'core-js/es6/date';
import 'core-js/es6/array';
import 'core-js/es6/regexp';
import 'core-js/es6/map';
import 'core-js/es6/weak-map';
import 'core-js/es6/set';

/** IE10 and IE11 requires the following for NgClass support on SVG elements */
import 'classlist.js';  // Run `npm install --save classlist.js`.

/** IE10 and IE11 requires the following for the Reflect API. */
import 'core-js/es6/reflect';


/** Evergreen browsers require these. **/
// Used for reflect-metadata in JIT. If you use AOT (and only Angular decorators), you can remove.
import 'core-js/es7/reflect';


/**
 * Required to support Web Animations `@angular/platform-browser/animations`.
 * Needed for: All but Chrome, Firefox and Opera. http://caniuse.com/#feat=web-animation
 **/
// import 'web-animations-js';  // Run `npm install --save web-animations-js`.



/***************************************************************************************************
 * Zone JS is required by default for Angular itself.
 */
import 'zone.js/dist/zone';  // Included with Angular CLI.
/***************************************************************************************************
 * APPLICATION IMPORTS
 */

```
### karma配置文件

> 在项目根目录下创建karma配置文件karma.conf.js

```js

// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'shark'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('shark-test/dist/src/plugin/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml'],
    port: 9888,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};

```
## 六、使用

### 运行测试代码

```sh

npm run test

```
或者
```sh

st test

```
或者
```sh

shark-test test

```
## 七、FAQ
  
  
## 八、angular测试手册

### 各类测试说明：
### 一、Component（带输入输出的组件、带路由的组件、带依赖的组件、嵌套组件）
1. 组件类测试
> 像测试服务类一样测试组件类，单独测试组件类本身而不必涉及DOM。

例子1：下面是一个列表组件ProduceScheduleComponent（带路由的组件、带依赖的组件、嵌套组件）

```js
import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProduceScheduleService } from './produce-schedule.service';
@Component({
    styleUrls: ['./produce-schedule.component.scss'],
    templateUrl: './produce-schedule.component.html'
})

export class ProduceScheduleComponent {
    purchaseOrderList: Array<any>;//采购单列表
    pagination: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private produceScheduleService: ProduceScheduleService
    ) {
    }

    ngOnInit() {
        let params={
          page:1,
          size:20
        }
        this.getPurchaseList(params)
    }

    getPurchaseList(params) {
        this.produceScheduleService.getProceedingList(params).then(data => {
            this.purchaseOrderList = data.result
            this.pagination = data.pagination
        }).catch(err => { })
    }
}

```
组件对应的测试代码

```js
import { TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SharkValid, SharkValidForm, Common } from "@shark/shark-angularX";
import { RouterTestingModule } from '@angular/router/testing';
import { ProduceScheduleComponent } from './produce-schedule.component';
import { ProduceScheduleService } from './produce-schedule.service';

describe('#ProduceScheduleComponent', () => {
    let produceScheduleService;
    let fixture;
    let component;
    let getProceedingListSpy;
    let selectDom;
    let data = {
        code: 200,
        data: {
            pagination: {
                page: 1,
                size: 10,
                total: 354,
                totalPage: 36,
                offset: 0
            },
            result: [{}]
        }
    };
    beforeEach(() => {
        // 创建 ProduceScheduleService实例，并伪造了`getProceedingList()`方法
        const produceScheduleService = jasmine.createSpyObj('ProduceScheduleService', ['getProceedingList']);
        // 设置伪造的`getProceedingList()`方法的返回值
        getProceedingListSpy = produceScheduleService.getProceedingList.and.returnValue(new Promise<any>((resolve, reject) => { resolve(data) }));
        // 引入组件测试环境的依赖
        TestBed.configureTestingModule({
          // RouterTestingModule：建立测试需要的路由
            imports: [RouterTestingModule],
            declarations: [ProduceScheduleComponent, SharkValidForm, SharkValid],
            providers: [{ provide: ProduceScheduleService, useValue: produceScheduleService }, Common],
            // 对嵌套组件,可能包含更多组件
            //NO_ERRORS_SCHEM会要求 Angular 编译器忽略不认识的那些元素和属性
            schemas: [NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(ProduceScheduleComponent);
        component = fixture.componentInstance;
    });
    // 测试组件是否创建成成功
    it('should create the ProduceScheduleComponent', async(() => {
        expect(component).toBeTruthy();
    }));
    // 测试getProceedingList方法有没有被调用
    it('should call getProceedingList after component initialized', () => {
        fixture.detectChanges(); 
        // sync spy result shows getProceedingList immediately after init
        expect(getProceedingListSpy.calls.any()).toBe(true, 'getProceedingList called');
    });
});
```

例子2：下面是一个列表组件ProduceScheduleComponent（带输入的组件）

调用组件代码

```html
<schedule-item [purchaseItem]="item"></schedule-item>

```

ScheduleItemComponent组件的测试代码

```js
import { TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SharkToastrService, SharkModalService } from "@shark/shark-angularX";
import { RouterTestingModule } from '@angular/router/testing';
import { ScheduleItemComponent } from './schedule-item.component';
import { PurchaseStatePipe } from '../purchase-state.pipe'
import { SharedModule } from '../../../shared/shared.module'

describe('#ScheduleItemComponent', () => {
    let fixture;
    let component;
    let purchaseOrderEl;
    let purchaseItem = {
        purchaseOrder: "1375870000011112-20171024-32",
        allowModify: true,
        isVersion1_0: 0,
        purchaseOrderType: 2,
        purchaseOrderSaleModel: 1,
    }
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, SharedModule],
            declarations: [ScheduleItemComponent, PurchaseStatePipe],
            providers: [SharkToastrService, SharkModalService],
            // test will not load sub components
            schemas: [NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(ScheduleItemComponent);
        component = fixture.componentInstance;
        // 给组件传入purchaseItem数据
        component.purchaseItem = purchaseItem;
        fixture.detectChanges();

    });

    // 测试输入数据中采购单号在页面显示的正确性
    it('should display same purchaseOrder as purchaseItem.purchaseOrder ', () => {
        // 查找显示采购单号的标签元素
        purchaseOrderEl = fixture.nativeElement.querySelectorAll('b')[0];
        const purchaseOrder = purchaseItem.purchaseOrder;
        expect(purchaseOrderEl.textContent).toContain(purchaseOrder);
    });
});

```

2. 组件Dom测试
> 测试组件是否能正常渲染出来、响应用户的输入和查询或与它的父组件和子组件相集成

例子：略


### 二、Directive
>  Directive作为宿主元素的属性来被使用的, 需要创建宿主元素来对指令的行为进行测试

例子：ShowAndHideListDirective的功能是控制table行数展示，并有展开、收起功能

```js
import { Directive, ElementRef, HostListener, Input } from '@angular/core'

@Directive({
    selector: '[showAndHideList]'
})
export class ShowAndHideListDirective {
    private el: HTMLElement;
    @Input('showAndHideList') initNum: number;

    constructor(el: ElementRef) {
        this.el = el.nativeElement;
        this.el.style.backgroundColor = '#f4f4f4';
    }
    @HostListener('click') onClick() {
        var isHide = false;
        var groups = this.el.parentElement.parentElement.getElementsByTagName('tr');
        for (var i = this.initNum; i < groups.length; i++) {
            var item = groups[i];
            if (item.id == 'showAndHide') {
                break;
            }
            if (item.classList.contains('hide')) {
                item.classList.remove('hide');
                isHide = true;
            } else {
                item.classList.add('hide');
                isHide = false;
            }
        }
        if (isHide) {
            this.el.innerHTML = "收起商品<i class = 'icon-up'></i>"
        } else {
            this.el.innerHTML = "全部商品<i class = 'icon-down'></i>"
        }
    }
}
```
ShowAndHideListDirective指令的测试代码

```ts
import { Component, OnInit } from '@angular/core'
import { TestBed } from '@angular/core/testing';
import { ShowAndHideListDirective } from './showAndHideList.directive'

@Component({
    template: `
    <div class="table-wrap margin-b-4x">
      <table class="table table-full text-center">
          <thead>
              <tr>
                  <th>严选SKU ID</th>
                  <th>商品名称</th>
                  <th>规格</th>
              </tr>
          </thead>
          <tbody class="text-center">
              <tr *ngFor="let item of skuItems;index as i " [ngClass]="{'hide':i > initNum-1}">
                  <td>{{item.skuId}}</td>
                  <td>{{item.itemName}}</td>
                  <td>{{item.specValueDesc}}</td>
              </tr>
              <tr [ngClass]="{'hide': initNum >= skuItems.length}" id="showAndHide">
                  <td [showAndHideList]="initNum" [attr.colspan]="3" class="text-center text-gold text-cursor-pointer ">全部商品
                      <i class="icon-down"></i>
                  </td>
              </tr>
          </tbody>
      </table>
    </div>`,
    styleUrls: ['./test.component.scss']
})
class TestComponent {
    initNum: any = 3;
    skuItems: any = [{
        itemId: 10843001,
        itemName: "简约收纳盒",
        specValueDesc: "尺寸:大",
        skuId: 10924002
    }, {
        itemId: 10843001,
        itemName: "简约收纳盒",
        specValueDesc: "尺寸:中",
        skuId: 10924003
    }, {
        itemId: 10843001,
        itemName: "简约收纳盒",
        specValueDesc: "尺寸:小",
        skuId: 10924004
    },
    {
        itemId: 10843001,
        itemName: "女士水桶包",
        specValueDesc: "颜色:红",
        skuId: 10924005
    },
    {
        itemId: 10843001,
        itemName: "女士水桶包",
        specValueDesc: "颜色:黑",
        skuId: 10924006
    },
    {
        itemId: 10843001,
        itemName: "女士水桶包",
        specValueDesc: "颜色:白",
        skuId: 10924007
    },
    {
        itemId: 10843001,
        itemName: "男士T恤",
        specValueDesc: "尺寸:M",
        skuId: 10924008
    },
    {
        itemId: 10843001,
        itemName: "男士T恤",
        specValueDesc: "尺寸:L",
        skuId: 10924009
    }
    ];
}
describe('ShowAndHideListDirective', () => {
    let fixture;
    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [ShowAndHideListDirective, TestComponent]
        }).createComponent(TestComponent);
    });
    // 测试表格原本的行数
    it('should have 10 <tr>', () => {
        fixture.detectChanges();
        const tr: any = fixture.nativeElement.querySelectorAll('tr');
        expect(tr.length).toBe(10);
    });
    // 测试表格隐藏的行数
    it('should have 5 <tr> with hide', () => {
        fixture.detectChanges();
        const tr: any = fixture.nativeElement.querySelectorAll('.hide');
        expect(tr.length).toBe(5);
    });
    // 测试点击展开全部按钮后隐藏的行数
    it('should have 0 <tr> with hide', () => {
        const display = fixture.nativeElement.querySelector('#showAndHide');
        display.click();
        const tr: any = fixture.nativeElement.querySelectorAll('.hide');
        expect(tr.length).toBe(0);
    });

});

```

### 三、Service(非http服务)
>  service的测试 非http服务基本上不需要依赖Angular的测试工具集.按普通类对待就好，我们以下面的例子说明

eg .目录结构如下

    |-- demo
        |-- master.service.js
        |-- master.service.spec.js
        |-- value.service.js
        |-- value.service.spec.ts

valueService 是一个简单的Service。包含有若干方法
```js 
// demo/value.service.js

import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable()
export class ValueService {
    constructor() { }

    getValue() {
        return { data: 123 }
    }

    getValue1() {
        return Observable.of({ data: 456 })
    }

    getValue2() {
        return new Promise((resolve, reject) => {
            resolve({ data: 789 })
        })
    }
}

```
对ValueService的测试如下：你会发现，和我们平时写代码是一样的，只不过多了一个断言判断

```js
import { ValueService } from './value.service'

describe('MasterService', () => {
    let service: ValueService;

    beforeEach(() => {
        service = new ValueService();
    })

    it('#getValue should return real value', () => {
        expect(service.getValue()).toEqual({ data: 123 })
    })

    it('#getValue1 should return value from observable', async () => {
        service.getValue1().subscribe(value => {
            expect(value).toEqual({ data: 456 })
        })
    })

    it('#getValue2 should return value from promise', async () => {
        service.getValue2().then(value => {
            expect(value).toEqual({ data: 789 })
        })
    })
})
```
MasterService 依赖了ValueService

```js 
// demo/master.service.js

import { Injectable } from '@angular/core';
import { ValueService } from './value.service';

@Injectable()
export class MasterService {
    constructor(private valueService: ValueService) {

    }
    getValue() {
        return this.valueService.getValue();
    }
}

```
对于有依赖的服务。有很多种测试方案：
1. 如果依赖的服务相对简单，而且可靠，这时候可以直接引入真实依赖。做法和产品代码环境一样：

```js 
// demo/master.service.spec.js

import { ValueService } from './value.service'
import { MasterService } from './demo'

describe('MasterService real', () => {
    let service: ValueService;
    let masterServie: MasterService;

    beforeEach(() => {
        service = new ValueService();
        masterServie = new MasterService(service);
    })

    it('#getValue should return real value', () => {
        expect(masterServie.getValue()).toEqual({ data: 123 })
    })
})

```
2. Spy：利用spyObj来替换真实的依赖，并借助testBed创建类并注入服务

```js

import { ValueService } from './value.service'
import { MasterService } from './master.service'
import { TestBed } from '@angular/core/testing';

describe('', () => {
    let masterService: MasterService;
    let valueServiceSpy: jasmine.SpyObj<ValueService>;
    // 每个it测试前都会运行的前置条件
    beforeEach(() => {
        // 创建一个spy对象
        const spy = jasmine.createSpyObj('ValueService', ['getValue']);
        // 在TestBed提供并注入服务
        TestBed.configureTestingModule({
            providers: [
                MasterService,
                { provide: ValueService, useValue: spy }
            ]
        });
        // 获取服务
        masterService = TestBed.get(MasterService);
        valueServiceSpy = TestBed.get(ValueService);
    });
    it('#getValue should return stubbed value from a spy', () => {
        const stubValue = { data: 123 };
        valueServiceSpy.getValue.and.returnValue(stubValue);
        // 数据 断言
        expect(masterService.getValue())
            .toBe(stubValue, 'service returned stub value');
        // 调用次数 断言
        expect(valueServiceSpy.getValue.calls.count())
            .toBe(1, 'spy method was called once');
        // 最近一次返回的数据 断言
        expect(valueServiceSpy.getValue.calls.mostRecent().returnValue)
            .toBe(stubValue);
    });
})

```

>如果我们要测的服务含有http请求，一般是采用mock的方式,考虑到我们项目中的的实际情况，这里的测试验证点在于:   
&ensp;&ensp;1、是否发出了请求(代码是否执行)  
&ensp;&ensp;2、是否发出了预期的请求(请求路径是否正确、请求方法是否正确)  
&ensp;&ensp;3、是否发出了非预期的请求（有没有胡乱发送请求)  
&ensp;&ensp;4、对返回code的处理是否符合预期（code = 200正确预期是否成立 ，code = 400，错误的预期是否成立）  
eg.  
以大制造家中的supplier-info.service.ts为例

```js
import { Injectable } from '@angular/core'
import { Ajax } from '@shark/shark-angularX'
import { Observable } from 'rxjs'

@Injectable()
export class SupplierInfo {
    private getSupplierInfoUrl = '/login/getSupplierInfo.json' 
    infoData: any = void 0
    constructor(
        private ajax: Ajax
    ) {
    }

    getSupplierInfo(obj: Object = {}) {
        if (this.infoData) {
            return Observable.of(this.infoData);
        }
        else {
            return Observable.fromPromise<any>(
                this.ajax.get(this.getSupplierInfoUrl, obj).then(data => {
                    this.infoData = data
                    return this.infoData
                })
            )
        }
    }
}
```

其测试用例的写法为：具体见注释

```js 
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Common, Ajax, Cookie } from '@shark/shark-angularX'
import { TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SupplierInfo } from './supplier-info.service';

describe('#SupplierInfo', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let supplierInfo: SupplierInfo;
    let ajax: Ajax;
    beforeEach(() => {
        TestBed.configureTestingModule({
            // http test 依赖 HttpClientTestingModule
            imports: [HttpClientTestingModule],
            // SupplierInfo 依赖 Ajax，而Ajax依赖Common, Cookie,这些都必须在providers里注明
            providers: [Ajax, Common, Cookie, SupplierInfo],
            schemas: [NO_ERRORS_SCHEMA]
        });
        // 各服务获取
        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController);
        ajax = TestBed.get(Ajax);
        supplierInfo = TestBed.get(SupplierInfo);
        // 成功数据 
        this.expectedSupplierInfoSuccess = {
            code: 200,
            data: {

            }
        };
        // 失败数据 
        this.expectedSupplierInfoFail = {
            code: 400,
            errorCode: 'xxxx'
        }
    });

    afterEach(() => {
        // 验证没有发起过预期之外的请求
        httpTestingController.verify();
    });

    it('SupplierInfo service should be defined',
        () => {
            expect(supplierInfo).toBeDefined;
        }
    )

    it('infoData should be undefinded before the first call for getSupplierInfo',
        () => {
            expect(supplierInfo.infoData).toBeUndefined;
        }
    )

    it('infoData should be the supplierInfo after the first call for getSupplierInfo',
        () => {
            supplierInfo.getSupplierInfo();
            const req1 = httpTestingController.expectOne('/login/getSupplierInfo.json');
            req1.flush(this.expectedSupplierInfoSuccess);
            supplierInfo.getSupplierInfo();
            const req2 = httpTestingController.expectOne('/login/getSupplierInfo.json');
            req2.flush(this.expectedSupplierInfoSuccess);
            expect(supplierInfo.infoData).toBeDefined;
        }
    )

    it('getSupplierInfo should return value from observable when the response is success',
        () => {
            // 操作
            supplierInfo.getSupplierInfo().subscribe(value => {
                expect(value).toEqual(this.expectedSupplierInfoSuccess, 'should return expected expectedSupplierInfoSuccess'),
                    data => fail('should have successed with the data')
            });
            // 请求路径验证
            const req = httpTestingController.expectOne('/login/getSupplierInfo.json');
            // 请求method验证
            expect(req.request.method).toEqual('GET', 'the request method shoud be GET');
            // 指定返回数据 resolve Observable 
            req.flush(this.expectedSupplierInfoSuccess);
        });

    it('getSupplierInfo should return value from observable when the response is fail',
        () => {
            // 操作
            supplierInfo.getSupplierInfo().subscribe(
                data => fail('should have failed with the errorCode'),
                value => {
                    expect(value).toEqual(this.expectedSupplierInfoFail, 'should return expected expectedSupplierInfoFail')
                });
            // 请求路径验证
            const req = httpTestingController.expectOne('/login/getSupplierInfo.json');
            // 请求method验证
            expect(req.request.method).toEqual('GET', 'the request method shoud be GET');
            // 指定返回数据 resolve Observable 
            req.flush(this.expectedSupplierInfoFail);
        });
});

```

- pipe
>  pipe 除了 @Pipe元数据和一个接口基本上不依赖angular，所以它的测试很简单

eg.
 以一个大制造家中的OrderBySkuId管道为例：
 
```js
import { Pipe, PipeTransform } from '@angular/core';

/*
 * 按skuid排序 
*/
@Pipe({ name: 'orderBySkuId' })
export class OrderBySkuId implements PipeTransform {
    constructor(
    ) {
    }
    transform(list = []): any {
        if (list && list.length > 0) {
            return list.sort((a, b) => a.skuId - b.skuId);
        } else {
            return []
        }
    }
}

```

测试代码只需对其transform调用并断言即可：

```js
import { OrderBySkuId } from './order-by-skuid.pipe';
import { each } from 'fpb';

describe('OrderBySkuIdPipe', () => {
    const orderBySkuIdPipe = new OrderBySkuId();
    const skuList = [{
        skuId: 3
    }, {
        skuId: 4
    }, {
        skuId: 1
    }, {
        skuId: 2
    }];

    const expectedData = [{
        skuId: 1
    }, {
        skuId: 2
    }, {
        skuId: 3
    }, {
        skuId: 4
    }];

    const expectedToEqualEmptyArr = each((v) => {
        expect(orderBySkuIdPipe.transform(v)).toEqual([]);
    })
    it('transforms null、 undefiend、""、[] to []', () => {
        expectedToEqualEmptyArr([null, undefined, '', []])
    });
    it('transforms list orderBy it\'s skuid property', () => {
        expect(orderBySkuIdPipe.transform(skuList)).toEqual(expectedData);
    });
})

```

### 常用测试技巧罗列：可参见 https://angular.cn/guide/testing
___
1. 改写组件provider
2. Dom测试封装（见angular测试指导 page类）
3. spy的使用
4. jasmine-marbles的使用