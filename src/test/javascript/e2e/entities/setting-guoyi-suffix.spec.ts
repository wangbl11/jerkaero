import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Setting e2e test', () => {

    let navBarPage: NavBarPage;
    let settingDialogPage: SettingDialogPage;
    let settingComponentsPage: SettingComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Settings', () => {
        navBarPage.goToEntity('setting-guoyi-suffix');
        settingComponentsPage = new SettingComponentsPage();
        expect(settingComponentsPage.getTitle())
            .toMatch(/jerkaeroApp.setting.home.title/);

    });

    it('should load create Setting dialog', () => {
        settingComponentsPage.clickOnCreateButton();
        settingDialogPage = new SettingDialogPage();
        expect(settingDialogPage.getModalTitle())
            .toMatch(/jerkaeroApp.setting.home.createOrEditLabel/);
        settingDialogPage.close();
    });

    it('should create and save Settings', () => {
        settingComponentsPage.clickOnCreateButton();
        settingDialogPage.setNameInput('name');
        expect(settingDialogPage.getNameInput()).toMatch('name');
        settingDialogPage.typeSelectLastOption();
        settingDialogPage.setValueInput('value');
        expect(settingDialogPage.getValueInput()).toMatch('value');
        settingDialogPage.setDefvalueInput('defvalue');
        expect(settingDialogPage.getDefvalueInput()).toMatch('defvalue');
        settingDialogPage.save();
        expect(settingDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SettingComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-setting-guoyi-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class SettingDialogPage {
    modalTitle = element(by.css('h4#mySettingLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    typeSelect = element(by.css('select#field_type'));
    valueInput = element(by.css('input#field_value'));
    defvalueInput = element(by.css('input#field_defvalue'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setTypeSelect = function(type) {
        this.typeSelect.sendKeys(type);
    };

    getTypeSelect = function() {
        return this.typeSelect.element(by.css('option:checked')).getText();
    };

    typeSelectLastOption = function() {
        this.typeSelect.all(by.tagName('option')).last().click();
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
