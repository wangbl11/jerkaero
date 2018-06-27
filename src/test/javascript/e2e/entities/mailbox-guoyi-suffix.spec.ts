import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Mailbox e2e test', () => {

    let navBarPage: NavBarPage;
    let mailboxDialogPage: MailboxDialogPage;
    let mailboxComponentsPage: MailboxComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Mailboxes', () => {
        navBarPage.goToEntity('mailbox-guoyi-suffix');
        mailboxComponentsPage = new MailboxComponentsPage();
        expect(mailboxComponentsPage.getTitle())
            .toMatch(/jerkaeroApp.mailbox.home.title/);

    });

    it('should load create Mailbox dialog', () => {
        mailboxComponentsPage.clickOnCreateButton();
        mailboxDialogPage = new MailboxDialogPage();
        expect(mailboxDialogPage.getModalTitle())
            .toMatch(/jerkaeroApp.mailbox.home.createOrEditLabel/);
        mailboxDialogPage.close();
    });

    it('should create and save Mailboxes', () => {
        mailboxComponentsPage.clickOnCreateButton();
        mailboxDialogPage.setSendIdInput('5');
        expect(mailboxDialogPage.getSendIdInput()).toMatch('5');
        mailboxDialogPage.setReceiverIdInput('5');
        expect(mailboxDialogPage.getReceiverIdInput()).toMatch('5');
        mailboxDialogPage.setMsgTypeInput('5');
        expect(mailboxDialogPage.getMsgTypeInput()).toMatch('5');
        mailboxDialogPage.setTitleInput('title');
        expect(mailboxDialogPage.getTitleInput()).toMatch('title');
        mailboxDialogPage.setMcontentInput('mcontent');
        expect(mailboxDialogPage.getMcontentInput()).toMatch('mcontent');
        mailboxDialogPage.setSourceIdInput('5');
        expect(mailboxDialogPage.getSourceIdInput()).toMatch('5');
        mailboxDialogPage.setCreatedDateInput('2000-12-31');
        expect(mailboxDialogPage.getCreatedDateInput()).toMatch('2000-12-31');
        mailboxDialogPage.setReadDateInput('2000-12-31');
        expect(mailboxDialogPage.getReadDateInput()).toMatch('2000-12-31');
        mailboxDialogPage.setAnonymousInput('5');
        expect(mailboxDialogPage.getAnonymousInput()).toMatch('5');
        mailboxDialogPage.jerkSelectLastOption();
        mailboxDialogPage.jerkSelectLastOption();
        mailboxDialogPage.save();
        expect(mailboxDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class MailboxComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-mailbox-guoyi-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class MailboxDialogPage {
    modalTitle = element(by.css('h4#myMailboxLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    sendIdInput = element(by.css('input#field_sendId'));
    receiverIdInput = element(by.css('input#field_receiverId'));
    msgTypeInput = element(by.css('input#field_msgType'));
    titleInput = element(by.css('input#field_title'));
    mcontentInput = element(by.css('input#field_mcontent'));
    sourceIdInput = element(by.css('input#field_sourceId'));
    createdDateInput = element(by.css('input#field_createdDate'));
    readDateInput = element(by.css('input#field_readDate'));
    anonymousInput = element(by.css('input#field_anonymous'));
    
    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setSendIdInput = function(sendId) {
        this.sendIdInput.sendKeys(sendId);
    };

    getSendIdInput = function() {
        return this.sendIdInput.getAttribute('value');
    };

    setReceiverIdInput = function(receiverId) {
        this.receiverIdInput.sendKeys(receiverId);
    };

    getReceiverIdInput = function() {
        return this.receiverIdInput.getAttribute('value');
    };

    setMsgTypeInput = function(msgType) {
        this.msgTypeInput.sendKeys(msgType);
    };

    getMsgTypeInput = function() {
        return this.msgTypeInput.getAttribute('value');
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

    setSourceIdInput = function(sourceId) {
        this.sourceIdInput.sendKeys(sourceId);
    };

    getSourceIdInput = function() {
        return this.sourceIdInput.getAttribute('value');
    };

    setCreatedDateInput = function(createdDate) {
        this.createdDateInput.sendKeys(createdDate);
    };

    getCreatedDateInput = function() {
        return this.createdDateInput.getAttribute('value');
    };

    setReadDateInput = function(readDate) {
        this.readDateInput.sendKeys(readDate);
    };

    getReadDateInput = function() {
        return this.readDateInput.getAttribute('value');
    };

    setAnonymousInput = function(anonymous) {
        this.anonymousInput.sendKeys(anonymous);
    };

    getAnonymousInput = function() {
        return this.anonymousInput.getAttribute('value');
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
