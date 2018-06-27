import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('GlobalSetting e2e test', () => {

    let navBarPage: NavBarPage;
    let globalSettingDialogPage: GlobalSettingDialogPage;
    let globalSettingComponentsPage: GlobalSettingComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load GlobalSettings', () => {
        navBarPage.goToEntity('global-setting-guoyi-suffix');
        globalSettingComponentsPage = new GlobalSettingComponentsPage();
        expect(globalSettingComponentsPage.getTitle())
            .toMatch(/jerkaeroApp.globalSetting.home.title/);

    });

    it('should load create GlobalSetting dialog', () => {
        globalSettingComponentsPage.clickOnCreateButton();
        globalSettingDialogPage = new GlobalSettingDialogPage();
        expect(globalSettingDialogPage.getModalTitle())
            .toMatch(/jerkaeroApp.globalSetting.home.createOrEditLabel/);
        globalSettingDialogPage.close();
    });

    it('should create and save GlobalSettings', () => {
        globalSettingComponentsPage.clickOnCreateButton();
        globalSettingDialogPage.setNameInput('name');
        expect(globalSettingDialogPage.getNameInput()).toMatch('name');
        globalSettingDialogPage.setTypeInput('5');
        expect(globalSettingDialogPage.getTypeInput()).toMatch('5');
        globalSettingDialogPage.setValueInput('value');
        expect(globalSettingDialogPage.getValueInput()).toMatch('value');
        globalSettingDialogPage.setDefvalueInput('defvalue');
        expect(globalSettingDialogPage.getDefvalueInput()).toMatch('defvalue');
        globalSettingDialogPage.setCreatedDateInput(12310020012301);
        expect(globalSettingDialogPage.getCreatedDateInput()).toMatch('2001-12-31T02:30');
        globalSettingDialogPage.setModifiedDateInput(12310020012301);
        expect(globalSettingDialogPage.getModifiedDateInput()).toMatch('2001-12-31T02:30');
        globalSettingDialogPage.save();
        expect(globalSettingDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class GlobalSettingComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-global-setting-guoyi-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class GlobalSettingDialogPage {
    modalTitle = element(by.css('h4#myGlobalSettingLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    typeInput = element(by.css('input#field_type'));
    valueInput = element(by.css('input#field_value'));
    defvalueInput = element(by.css('input#field_defvalue'));
    createdDateInput = element(by.css('input#field_createdDate'));
    modifiedDateInput = element(by.css('input#field_modifiedDate'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setTypeInput = function(type) {
        this.typeInput.sendKeys(type);
    };

    getTypeInput = function() {
        return this.typeInput.getAttribute('value');
    };

    setValueInput = function(value) {
        this.valueInput.sendKeys(value);
    };

    getValueInput = function() {
        return this.valueInput.getAttribute('value');
    };

    setDefvalueInput = function(defvalue) {
        this.defvalueInput.sendKeys(defvalue);
    };

    getDefvalueInput = function() {
        return this.defvalueInput.getAttribute('value');
    };

    setCreatedDateInput = function(createdDate) {
        this.createdDateInput.sendKeys(createdDate);
    };

    getCreatedDateInput = function() {
        return this.createdDateInput.getAttribute('value');
    };

    setModifiedDateInput = function(modifiedDate) {
        this.modifiedDateInput.sendKeys(modifiedDate);
    };

    getModifiedDateInput = function() {
        return this.modifiedDateInput.getAttribute('value');
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
