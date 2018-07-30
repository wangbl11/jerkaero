import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('MessageText e2e test', () => {

    let navBarPage: NavBarPage;
    let messageTextDialogPage: MessageTextDialogPage;
    let messageTextComponentsPage: MessageTextComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load MessageTexts', () => {
        navBarPage.goToEntity('message-text-guoyi-suffix');
        messageTextComponentsPage = new MessageTextComponentsPage();
        expect(messageTextComponentsPage.getTitle())
            .toMatch(/jerkaeroApp.messageText.home.title/);

    });

    it('should load create MessageText dialog', () => {
        messageTextComponentsPage.clickOnCreateButton();
        messageTextDialogPage = new MessageTextDialogPage();
        expect(messageTextDialogPage.getModalTitle())
            .toMatch(/jerkaeroApp.messageText.home.createOrEditLabel/);
        messageTextDialogPage.close();
    });

    it('should create and save MessageTexts', () => {
        messageTextComponentsPage.clickOnCreateButton();
        messageTextDialogPage.setSendIDInput('5');
        expect(messageTextDialogPage.getSendIDInput()).toMatch('5');
        messageTextDialogPage.setTypeInput('5');
        expect(messageTextDialogPage.getTypeInput()).toMatch('5');
        messageTextDialogPage.setTitleInput('title');
        expect(messageTextDialogPage.getTitleInput()).toMatch('title');
        messageTextDialogPage.setMcontentInput('mcontent');
        expect(messageTextDialogPage.getMcontentInput()).toMatch('mcontent');
        messageTextDialogPage.setCreatedDateInput(12310020012301);
        expect(messageTextDialogPage.getCreatedDateInput()).toMatch('2001-12-31T02:30');
        messageTextDialogPage.save();
        expect(messageTextDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class MessageTextComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-message-text-guoyi-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class MessageTextDialogPage {
    modalTitle = element(by.css('h4#myMessageTextLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    sendIDInput = element(by.css('input#field_sendID'));
    typeInput = element(by.css('input#field_type'));
    titleInput = element(by.css('input#field_title'));
    mcontentInput = element(by.css('input#field_mcontent'));
    createdDateInput = element(by.css('input#field_createdDate'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setSendIDInput = function(sendID) {
        this.sendIDInput.sendKeys(sendID);
    };

    getSendIDInput = function() {
        return this.sendIDInput.getAttribute('value');
    };

    setTypeInput = function(type) {
        this.typeInput.sendKeys(type);
    };

    getTypeInput = function() {
        return this.typeInput.getAttribute('value');
    };

    setTitleInput = function(title) {
        this.titleInput.sendKeys(title);
    };

    getTitleInput = function() {
        return this.titleInput.getAttribute('value');
    };

    setMcontentInput = function(mcontent) {
        this.mcontentInput.sendKeys(mcontent);
    };

    getMcontentInput = function() {
        return this.mcontentInput.getAttribute('value');
    };

    setCreatedDateInput = function(createdDate) {
        this.createdDateInput.sendKeys(createdDate);
    };

    getCreatedDateInput = function() {
        return this.createdDateInput.getAttribute('value');
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
