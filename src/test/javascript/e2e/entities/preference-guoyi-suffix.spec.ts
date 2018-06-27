import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Preference e2e test', () => {

    let navBarPage: NavBarPage;
    let preferenceDialogPage: PreferenceDialogPage;
    let preferenceComponentsPage: PreferenceComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Preferences', () => {
        navBarPage.goToEntity('preference-guoyi-suffix');
        preferenceComponentsPage = new PreferenceComponentsPage();
        expect(preferenceComponentsPage.getTitle())
            .toMatch(/jerkaeroApp.preference.home.title/);

    });

    it('should load create Preference dialog', () => {
        preferenceComponentsPage.clickOnCreateButton();
        preferenceDialogPage = new PreferenceDialogPage();
        expect(preferenceDialogPage.getModalTitle())
            .toMatch(/jerkaeroApp.preference.home.createOrEditLabel/);
        preferenceDialogPage.close();
    });

    it('should create and save Preferences', () => {
        preferenceComponentsPage.clickOnCreateButton();
        preferenceDialogPage.setWechatInput('wechat');
        expect(preferenceDialogPage.getWechatInput()).toMatch('wechat');
        preferenceDialogPage.setAddressInput('address');
        expect(preferenceDialogPage.getAddressInput()).toMatch('address');
        preferenceDialogPage.setImageUrlInput('imageUrl');
        expect(preferenceDialogPage.getImageUrlInput()).toMatch('imageUrl');
        preferenceDialogPage.setLangInput('lang');
        expect(preferenceDialogPage.getLangInput()).toMatch('lang');
        preferenceDialogPage.setCreatedDateInput('2000-12-31');
        expect(preferenceDialogPage.getCreatedDateInput()).toMatch('2000-12-31');
        preferenceDialogPage.setModifiedDateInput('2000-12-31');
        expect(preferenceDialogPage.getModifiedDateInput()).toMatch('2000-12-31');
        preferenceDialogPage.save();
        expect(preferenceDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PreferenceComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-preference-guoyi-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PreferenceDialogPage {
    modalTitle = element(by.css('h4#myPreferenceLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    wechatInput = element(by.css('input#field_wechat'));
    addressInput = element(by.css('input#field_address'));
    imageUrlInput = element(by.css('input#field_imageUrl'));
    langInput = element(by.css('input#field_lang'));
    createdDateInput = element(by.css('input#field_createdDate'));
    modifiedDateInput = element(by.css('input#field_modifiedDate'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setWechatInput = function(wechat) {
        this.wechatInput.sendKeys(wechat);
    };

    getWechatInput = function() {
        return this.wechatInput.getAttribute('value');
    };

    setAddressInput = function(address) {
        this.addressInput.sendKeys(address);
    };

    getAddressInput = function() {
        return this.addressInput.getAttribute('value');
    };

    setImageUrlInput = function(imageUrl) {
        this.imageUrlInput.sendKeys(imageUrl);
    };

    getImageUrlInput = function() {
        return this.imageUrlInput.getAttribute('value');
    };

    setLangInput = function(lang) {
        this.langInput.sendKeys(lang);
    };

    getLangInput = function() {
        return this.langInput.getAttribute('value');
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
