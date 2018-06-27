import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Footprint e2e test', () => {

    let navBarPage: NavBarPage;
    let footprintDialogPage: FootprintDialogPage;
    let footprintComponentsPage: FootprintComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Footprints', () => {
        navBarPage.goToEntity('footprint-guoyi-suffix');
        footprintComponentsPage = new FootprintComponentsPage();
        expect(footprintComponentsPage.getTitle())
            .toMatch(/jerkaeroApp.footprint.home.title/);

    });

    it('should load create Footprint dialog', () => {
        footprintComponentsPage.clickOnCreateButton();
        footprintDialogPage = new FootprintDialogPage();
        expect(footprintDialogPage.getModalTitle())
            .toMatch(/jerkaeroApp.footprint.home.createOrEditLabel/);
        footprintDialogPage.close();
    });

    it('should create and save Footprints', () => {
        footprintComponentsPage.clickOnCreateButton();
        footprintDialogPage.setSourceIdInput('5');
        expect(footprintDialogPage.getSourceIdInput()).toMatch('5');
        footprintDialogPage.setSourceTypeInput('5');
        expect(footprintDialogPage.getSourceTypeInput()).toMatch('5');
        footprintDialogPage.setReaderIdInput('5');
        expect(footprintDialogPage.getReaderIdInput()).toMatch('5');
        footprintDialogPage.setCreatedDateInput('2000-12-31');
        expect(footprintDialogPage.getCreatedDateInput()).toMatch('2000-12-31');
        footprintDialogPage.jerkSelectLastOption();
        footprintDialogPage.save();
        expect(footprintDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class FootprintComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-footprint-guoyi-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class FootprintDialogPage {
    modalTitle = element(by.css('h4#myFootprintLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    sourceIdInput = element(by.css('input#field_sourceId'));
    sourceTypeInput = element(by.css('input#field_sourceType'));
    readerIdInput = element(by.css('input#field_readerId'));
    createdDateInput = element(by.css('input#field_createdDate'));
    jerkSelect = element(by.css('select#field_jerk'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setSourceIdInput = function(sourceId) {
        this.sourceIdInput.sendKeys(sourceId);
    };

    getSourceIdInput = function() {
        return this.sourceIdInput.getAttribute('value');
    };

    setSourceTypeInput = function(sourceType) {
        this.sourceTypeInput.sendKeys(sourceType);
    };

    getSourceTypeInput = function() {
        return this.sourceTypeInput.getAttribute('value');
    };

    setReaderIdInput = function(readerId) {
        this.readerIdInput.sendKeys(readerId);
    };

    getReaderIdInput = function() {
        return this.readerIdInput.getAttribute('value');
    };

    setCreatedDateInput = function(createdDate) {
        this.createdDateInput.sendKeys(createdDate);
    };

    getCreatedDateInput = function() {
        return this.createdDateInput.getAttribute('value');
    };

    jerkSelectLastOption = function() {
        this.jerkSelect.all(by.tagName('option')).last().click();
    };

    jerkSelectOption = function(option) {
        this.jerkSelect.sendKeys(option);
    };

    getJerkSelect = function() {
        return this.jerkSelect;
    };

    getJerkSelectedOption = function() {
        return this.jerkSelect.element(by.css('option:checked')).getText();
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
