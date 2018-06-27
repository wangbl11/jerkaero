import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Jerk e2e test', () => {

    let navBarPage: NavBarPage;
    let jerkDialogPage: JerkDialogPage;
    let jerkComponentsPage: JerkComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Jerks', () => {
        navBarPage.goToEntity('jerk-guoyi-suffix');
        jerkComponentsPage = new JerkComponentsPage();
        expect(jerkComponentsPage.getTitle())
            .toMatch(/jerkaeroApp.jerk.home.title/);

    });

    it('should load create Jerk dialog', () => {
        jerkComponentsPage.clickOnCreateButton();
        jerkDialogPage = new JerkDialogPage();
        expect(jerkDialogPage.getModalTitle())
            .toMatch(/jerkaeroApp.jerk.home.createOrEditLabel/);
        jerkDialogPage.close();
    });

    it('should create and save Jerks', () => {
        jerkComponentsPage.clickOnCreateButton();
        jerkDialogPage.setUsernameInput('username');
        expect(jerkDialogPage.getUsernameInput()).toMatch('username');
        jerkDialogPage.setPasswdInput('passwd');
        expect(jerkDialogPage.getPasswdInput()).toMatch('passwd');
        jerkDialogPage.setDisplaynameInput('displayname');
        expect(jerkDialogPage.getDisplaynameInput()).toMatch('displayname');
        jerkDialogPage.authStatusSelectLastOption();
        jerkDialogPage.setCreatedDateInput('2000-12-31');
        expect(jerkDialogPage.getCreatedDateInput()).toMatch('2000-12-31');
        jerkDialogPage.setModifiedDateInput('2000-12-31');
        expect(jerkDialogPage.getModifiedDateInput()).toMatch('2000-12-31');
        jerkDialogPage.jerkInfoSelectLastOption();
        jerkDialogPage.preferenceSelectLastOption();
        jerkDialogPage.save();
        expect(jerkDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class JerkComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-jerk-guoyi-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class JerkDialogPage {
    modalTitle = element(by.css('h4#myJerkLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    usernameInput = element(by.css('input#field_username'));
    passwdInput = element(by.css('input#field_passwd'));
    displaynameInput = element(by.css('input#field_displayname'));
    authStatusSelect = element(by.css('select#field_authStatus'));
    createdDateInput = element(by.css('input#field_createdDate'));
    modifiedDateInput = element(by.css('input#field_modifiedDate'));
    jerkInfoSelect = element(by.css('select#field_jerkInfo'));
    preferenceSelect = element(by.css('select#field_preference'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setUsernameInput = function(username) {
        this.usernameInput.sendKeys(username);
    };

    getUsernameInput = function() {
        return this.usernameInput.getAttribute('value');
    };

    setPasswdInput = function(passwd) {
        this.passwdInput.sendKeys(passwd);
    };

    getPasswdInput = function() {
        return this.passwdInput.getAttribute('value');
    };

    setDisplaynameInput = function(displayname) {
        this.displaynameInput.sendKeys(displayname);
    };

    getDisplaynameInput = function() {
        return this.displaynameInput.getAttribute('value');
    };

    setAuthStatusSelect = function(authStatus) {
        this.authStatusSelect.sendKeys(authStatus);
    };

    getAuthStatusSelect = function() {
        return this.authStatusSelect.element(by.css('option:checked')).getText();
    };

    authStatusSelectLastOption = function() {
        this.authStatusSelect.all(by.tagName('option')).last().click();
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

    jerkInfoSelectLastOption = function() {
        this.jerkInfoSelect.all(by.tagName('option')).last().click();
    };

    jerkInfoSelectOption = function(option) {
        this.jerkInfoSelect.sendKeys(option);
    };

    getJerkInfoSelect = function() {
        return this.jerkInfoSelect;
    };

    getJerkInfoSelectedOption = function() {
        return this.jerkInfoSelect.element(by.css('option:checked')).getText();
    };

    preferenceSelectLastOption = function() {
        this.preferenceSelect.all(by.tagName('option')).last().click();
    };

    preferenceSelectOption = function(option) {
        this.preferenceSelect.sendKeys(option);
    };

    getPreferenceSelect = function() {
        return this.preferenceSelect;
    };

    getPreferenceSelectedOption = function() {
        return this.preferenceSelect.element(by.css('option:checked')).getText();
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
