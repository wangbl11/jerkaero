import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Message e2e test', () => {

    let navBarPage: NavBarPage;
    let messageDialogPage: MessageDialogPage;
    let messageComponentsPage: MessageComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Messages', () => {
        navBarPage.goToEntity('message-guoyi-suffix');
        messageComponentsPage = new MessageComponentsPage();
        expect(messageComponentsPage.getTitle())
            .toMatch(/jerkaeroApp.message.home.title/);

    });

    it('should load create Message dialog', () => {
        messageComponentsPage.clickOnCreateButton();
        messageDialogPage = new MessageDialogPage();
        expect(messageDialogPage.getModalTitle())
            .toMatch(/jerkaeroApp.message.home.createOrEditLabel/);
        messageDialogPage.close();
    });

    it('should create and save Messages', () => {
        messageComponentsPage.clickOnCreateButton();
        messageDialogPage.setSendIDInput('5');
        expect(messageDialogPage.getSendIDInput()).toMatch('5');
        messageDialogPage.setRecIDInput('5');
        expect(messageDialogPage.getRecIDInput()).toMatch('5');
        messageDialogPage.setMessageIDInput('5');
        expect(messageDialogPage.getMessageIDInput()).toMatch('5');
        messageDialogPage.setStatueInput('5');
        expect(messageDialogPage.getStatueInput()).toMatch('5');
        messageDialogPage.setReadDateInput(12310020012301);
        expect(messageDialogPage.getReadDateInput()).toMatch('2001-12-31T02:30');
        messageDialogPage.save();
        expect(messageDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class MessageComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-message-guoyi-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class MessageDialogPage {
    modalTitle = element(by.css('h4#myMessageLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    sendIDInput = element(by.css('input#field_sendID'));
    recIDInput = element(by.css('input#field_recID'));
    messageIDInput = element(by.css('input#field_messageID'));
    statueInput = element(by.css('input#field_statue'));
    readDateInput = element(by.css('input#field_readDate'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setSendIDInput = function(sendID) {
        this.sendIDInput.sendKeys(sendID);
    };

    getSendIDInput = function() {
        return this.sendIDInput.getAttribute('value');
    };

    setRecIDInput = function(recID) {
        this.recIDInput.sendKeys(recID);
    };

    getRecIDInput = function() {
        return this.recIDInput.getAttribute('value');
    };

    setMessageIDInput = function(messageID) {
        this.messageIDInput.sendKeys(messageID);
    };

    getMessageIDInput = function() {
        return this.messageIDInput.getAttribute('value');
    };

    setStatueInput = function(statue) {
        this.statueInput.sendKeys(statue);
    };

    getStatueInput = function() {
        return this.statueInput.getAttribute('value');
    };

    setReadDateInput = function(readDate) {
        this.readDateInput.sendKeys(readDate);
    };

    getReadDateInput = function() {
        return this.readDateInput.getAttribute('value');
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
