import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Tag e2e test', () => {

    let navBarPage: NavBarPage;
    let tagDialogPage: TagDialogPage;
    let tagComponentsPage: TagComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Tags', () => {
        navBarPage.goToEntity('tag-guoyi-suffix');
        tagComponentsPage = new TagComponentsPage();
        expect(tagComponentsPage.getTitle())
            .toMatch(/jerkaeroApp.tag.home.title/);

    });

    it('should load create Tag dialog', () => {
        tagComponentsPage.clickOnCreateButton();
        tagDialogPage = new TagDialogPage();
        expect(tagDialogPage.getModalTitle())
            .toMatch(/jerkaeroApp.tag.home.createOrEditLabel/);
        tagDialogPage.close();
    });

    it('should create and save Tags', () => {
        tagComponentsPage.clickOnCreateButton();
        tagDialogPage.setNameInput('name');
        expect(tagDialogPage.getNameInput()).toMatch('name');
        tagDialogPage.setTypeInput('5');
        expect(tagDialogPage.getTypeInput()).toMatch('5');
        tagDialogPage.setStatusInput('5');
        expect(tagDialogPage.getStatusInput()).toMatch('5');
        tagDialogPage.setWeightInput('5');
        expect(tagDialogPage.getWeightInput()).toMatch('5');
        tagDialogPage.setCreatedDateInput('2000-12-31');
        expect(tagDialogPage.getCreatedDateInput()).toMatch('2000-12-31');
        tagDialogPage.setModifiedDateInput('2000-12-31');
        expect(tagDialogPage.getModifiedDateInput()).toMatch('2000-12-31');
        tagDialogPage.save();
        expect(tagDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class TagComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-tag-guoyi-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TagDialogPage {
    modalTitle = element(by.css('h4#myTagLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    typeInput = element(by.css('input#field_type'));
    statusInput = element(by.css('input#field_status'));
    weightInput = element(by.css('input#field_weight'));
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

    setStatusInput = function(status) {
        this.statusInput.sendKeys(status);
    };

    getStatusInput = function() {
        return this.statusInput.getAttribute('value');
    };

    setWeightInput = function(weight) {
        this.weightInput.sendKeys(weight);
    };

    getWeightInput = function() {
        return this.weightInput.getAttribute('value');
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
