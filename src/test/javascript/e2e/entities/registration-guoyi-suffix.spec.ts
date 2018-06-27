import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Registration e2e test', () => {

    let navBarPage: NavBarPage;
    let registrationDialogPage: RegistrationDialogPage;
    let registrationComponentsPage: RegistrationComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Registrations', () => {
        navBarPage.goToEntity('registration-guoyi-suffix');
        registrationComponentsPage = new RegistrationComponentsPage();
        expect(registrationComponentsPage.getTitle())
            .toMatch(/jerkaeroApp.registration.home.title/);

    });

    it('should load create Registration dialog', () => {
        registrationComponentsPage.clickOnCreateButton();
        registrationDialogPage = new RegistrationDialogPage();
        expect(registrationDialogPage.getModalTitle())
            .toMatch(/jerkaeroApp.registration.home.createOrEditLabel/);
        registrationDialogPage.close();
    });

    it('should create and save Registrations', () => {
        registrationComponentsPage.clickOnCreateButton();
        registrationDialogPage.setRegistTypeInput('5');
        expect(registrationDialogPage.getRegistTypeInput()).toMatch('5');
        registrationDialogPage.setDwqcInput('dwqc');
        expect(registrationDialogPage.getDwqcInput()).toMatch('dwqc');
        registrationDialogPage.setHxcpmcInput('hxcpmc');
        expect(registrationDialogPage.getHxcpmcInput()).toMatch('hxcpmc');
        registrationDialogPage.setZztjdwInput('zztjdw');
        expect(registrationDialogPage.getZztjdwInput()).toMatch('zztjdw');
        registrationDialogPage.setDwhgrdzInput('dwhgrdz');
        expect(registrationDialogPage.getDwhgrdzInput()).toMatch('dwhgrdz');
        registrationDialogPage.setSzqylxInput('szqylx');
        expect(registrationDialogPage.getSzqylxInput()).toMatch('szqylx');
        registrationDialogPage.setSslyInput('ssly');
        expect(registrationDialogPage.getSslyInput()).toMatch('ssly');
        registrationDialogPage.setGscpjjInput('gscpjj');
        expect(registrationDialogPage.getGscpjjInput()).toMatch('gscpjj');
        registrationDialogPage.setMbkhscInput('mbkhsc');
        expect(registrationDialogPage.getMbkhscInput()).toMatch('mbkhsc');
        registrationDialogPage.setDqzykhInput('dqzykh');
        expect(registrationDialogPage.getDqzykhInput()).toMatch('dqzykh');
        registrationDialogPage.setGnwhjjxInput('gnwhjjx');
        expect(registrationDialogPage.getGnwhjjxInput()).toMatch('gnwhjjx');
        registrationDialogPage.zljsSelectLastOption();
        registrationDialogPage.hxjslySelectLastOption();
        registrationDialogPage.kjcgzhSelectLastOption();
        registrationDialogPage.jmlyqkSelectLastOption();
        registrationDialogPage.setJscsdInput('jscsd');
        expect(registrationDialogPage.getJscsdInput()).toMatch('jscsd');
        registrationDialogPage.setJzmsylqkInput('jzmsylqk');
        expect(registrationDialogPage.getJzmsylqkInput()).toMatch('jzmsylqk');
        registrationDialogPage.setJzysjsInput('jzysjs');
        expect(registrationDialogPage.getJzysjsInput()).toMatch('jzysjs');
        registrationDialogPage.setFzrdhInput('fzrdh');
        expect(registrationDialogPage.getFzrdhInput()).toMatch('fzrdh');
        registrationDialogPage.xbSelectLastOption();
        registrationDialogPage.setLxfsInput('lxfs');
        expect(registrationDialogPage.getLxfsInput()).toMatch('lxfs');
        registrationDialogPage.setEmailInput('email');
        expect(registrationDialogPage.getEmailInput()).toMatch('email');
        registrationDialogPage.fzrnlSelectLastOption();
        registrationDialogPage.tdpjnlSelectLastOption();
        registrationDialogPage.setGjrcsInput('5');
        expect(registrationDialogPage.getGjrcsInput()).toMatch('5');
        registrationDialogPage.sfgjrzgxjsqySelectLastOption();
        registrationDialogPage.setTdysjsInput('tdysjs');
        expect(registrationDialogPage.getTdysjsInput()).toMatch('tdysjs');
        registrationDialogPage.setXyczInput('xycz');
        expect(registrationDialogPage.getXyczInput()).toMatch('xycz');
        registrationDialogPage.setWlxwhdzclxInput('wlxwhdzclx');
        expect(registrationDialogPage.getWlxwhdzclxInput()).toMatch('wlxwhdzclx');
        registrationDialogPage.setWlxwhdzclx1Input('wlxwhdzclx1');
        expect(registrationDialogPage.getWlxwhdzclx1Input()).toMatch('wlxwhdzclx1');
        registrationDialogPage.setSfxyxcInput('sfxyxc');
        expect(registrationDialogPage.getSfxyxcInput()).toMatch('sfxyxc');
        registrationDialogPage.rzjhgkfwSelectLastOption();
        registrationDialogPage.rzmbSelectLastOption();
        registrationDialogPage.setLxrzwInput('lxrzw');
        expect(registrationDialogPage.getLxrzwInput()).toMatch('lxrzw');
        registrationDialogPage.setLxdhInput('lxdh');
        expect(registrationDialogPage.getLxdhInput()).toMatch('lxdh');
        registrationDialogPage.setLxyxInput('lxyx');
        expect(registrationDialogPage.getLxyxInput()).toMatch('lxyx');
        registrationDialogPage.setLxdzInput('lxdz');
        expect(registrationDialogPage.getLxdzInput()).toMatch('lxdz');
        registrationDialogPage.setSsly1Input('ssly1');
        expect(registrationDialogPage.getSsly1Input()).toMatch('ssly1');
        registrationDialogPage.setCreatedDateInput('2000-12-31');
        expect(registrationDialogPage.getCreatedDateInput()).toMatch('2000-12-31');
        registrationDialogPage.setModifiedDateInput('2000-12-31');
        expect(registrationDialogPage.getModifiedDateInput()).toMatch('2000-12-31');
        registrationDialogPage.save();
        expect(registrationDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class RegistrationComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-registration-guoyi-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class RegistrationDialogPage {
    modalTitle = element(by.css('h4#myRegistrationLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    registTypeInput = element(by.css('input#field_registType'));
    dwqcInput = element(by.css('input#field_dwqc'));
    hxcpmcInput = element(by.css('input#field_hxcpmc'));
    zztjdwInput = element(by.css('input#field_zztjdw'));
    dwhgrdzInput = element(by.css('input#field_dwhgrdz'));
    szqylxInput = element(by.css('input#field_szqylx'));
    sslyInput = element(by.css('input#field_ssly'));
    gscpjjInput = element(by.css('input#field_gscpjj'));
    mbkhscInput = element(by.css('input#field_mbkhsc'));
    dqzykhInput = element(by.css('input#field_dqzykh'));
    gnwhjjxInput = element(by.css('input#field_gnwhjjx'));
    zljsSelect = element(by.css('select#field_zljs'));
    hxjslySelect = element(by.css('select#field_hxjsly'));
    kjcgzhSelect = element(by.css('select#field_kjcgzh'));
    jmlyqkSelect = element(by.css('select#field_jmlyqk'));
    jscsdInput = element(by.css('input#field_jscsd'));
    jzmsylqkInput = element(by.css('input#field_jzmsylqk'));
    jzysjsInput = element(by.css('input#field_jzysjs'));
    fzrdhInput = element(by.css('input#field_fzrdh'));
    xbSelect = element(by.css('select#field_xb'));
    lxfsInput = element(by.css('input#field_lxfs'));
    emailInput = element(by.css('input#field_email'));
    fzrnlSelect = element(by.css('select#field_fzrnl'));
    tdpjnlSelect = element(by.css('select#field_tdpjnl'));
    gjrcsInput = element(by.css('input#field_gjrcs'));
    sfgjrzgxjsqySelect = element(by.css('select#field_sfgjrzgxjsqy'));
    tdysjsInput = element(by.css('input#field_tdysjs'));
    xyczInput = element(by.css('input#field_xycz'));
    wlxwhdzclxInput = element(by.css('input#field_wlxwhdzclx'));
    wlxwhdzclx1Input = element(by.css('input#field_wlxwhdzclx1'));
    sfxyxcInput = element(by.css('input#field_sfxyxc'));
    rzjhgkfwSelect = element(by.css('select#field_rzjhgkfw'));
    rzmbSelect = element(by.css('select#field_rzmb'));
    lxrzwInput = element(by.css('input#field_lxrzw'));
    lxdhInput = element(by.css('input#field_lxdh'));
    lxyxInput = element(by.css('input#field_lxyx'));
    lxdzInput = element(by.css('input#field_lxdz'));
    ssly1Input = element(by.css('input#field_ssly1'));
    createdDateInput = element(by.css('input#field_createdDate'));
    modifiedDateInput = element(by.css('input#field_modifiedDate'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setRegistTypeInput = function(registType) {
        this.registTypeInput.sendKeys(registType);
    };

    getRegistTypeInput = function() {
        return this.registTypeInput.getAttribute('value');
    };

    setDwqcInput = function(dwqc) {
        this.dwqcInput.sendKeys(dwqc);
    };

    getDwqcInput = function() {
        return this.dwqcInput.getAttribute('value');
    };

    setHxcpmcInput = function(hxcpmc) {
        this.hxcpmcInput.sendKeys(hxcpmc);
    };

    getHxcpmcInput = function() {
        return this.hxcpmcInput.getAttribute('value');
    };

    setZztjdwInput = function(zztjdw) {
        this.zztjdwInput.sendKeys(zztjdw);
    };

    getZztjdwInput = function() {
        return this.zztjdwInput.getAttribute('value');
    };

    setDwhgrdzInput = function(dwhgrdz) {
        this.dwhgrdzInput.sendKeys(dwhgrdz);
    };

    getDwhgrdzInput = function() {
        return this.dwhgrdzInput.getAttribute('value');
    };

    setSzqylxInput = function(szqylx) {
        this.szqylxInput.sendKeys(szqylx);
    };

    getSzqylxInput = function() {
        return this.szqylxInput.getAttribute('value');
    };

    setSslyInput = function(ssly) {
        this.sslyInput.sendKeys(ssly);
    };

    getSslyInput = function() {
        return this.sslyInput.getAttribute('value');
    };

    setGscpjjInput = function(gscpjj) {
        this.gscpjjInput.sendKeys(gscpjj);
    };

    getGscpjjInput = function() {
        return this.gscpjjInput.getAttribute('value');
    };

    setMbkhscInput = function(mbkhsc) {
        this.mbkhscInput.sendKeys(mbkhsc);
    };

    getMbkhscInput = function() {
        return this.mbkhscInput.getAttribute('value');
    };

    setDqzykhInput = function(dqzykh) {
        this.dqzykhInput.sendKeys(dqzykh);
    };

    getDqzykhInput = function() {
        return this.dqzykhInput.getAttribute('value');
    };

    setGnwhjjxInput = function(gnwhjjx) {
        this.gnwhjjxInput.sendKeys(gnwhjjx);
    };

    getGnwhjjxInput = function() {
        return this.gnwhjjxInput.getAttribute('value');
    };

    setZljsSelect = function(zljs) {
        this.zljsSelect.sendKeys(zljs);
    };

    getZljsSelect = function() {
        return this.zljsSelect.element(by.css('option:checked')).getText();
    };

    zljsSelectLastOption = function() {
        this.zljsSelect.all(by.tagName('option')).last().click();
    };
    setHxjslySelect = function(hxjsly) {
        this.hxjslySelect.sendKeys(hxjsly);
    };

    getHxjslySelect = function() {
        return this.hxjslySelect.element(by.css('option:checked')).getText();
    };

    hxjslySelectLastOption = function() {
        this.hxjslySelect.all(by.tagName('option')).last().click();
    };
    setKjcgzhSelect = function(kjcgzh) {
        this.kjcgzhSelect.sendKeys(kjcgzh);
    };

    getKjcgzhSelect = function() {
        return this.kjcgzhSelect.element(by.css('option:checked')).getText();
    };

    kjcgzhSelectLastOption = function() {
        this.kjcgzhSelect.all(by.tagName('option')).last().click();
    };
    setJmlyqkSelect = function(jmlyqk) {
        this.jmlyqkSelect.sendKeys(jmlyqk);
    };

    getJmlyqkSelect = function() {
        return this.jmlyqkSelect.element(by.css('option:checked')).getText();
    };

    jmlyqkSelectLastOption = function() {
        this.jmlyqkSelect.all(by.tagName('option')).last().click();
    };
    setJscsdInput = function(jscsd) {
        this.jscsdInput.sendKeys(jscsd);
    };

    getJscsdInput = function() {
        return this.jscsdInput.getAttribute('value');
    };

    setJzmsylqkInput = function(jzmsylqk) {
        this.jzmsylqkInput.sendKeys(jzmsylqk);
    };

    getJzmsylqkInput = function() {
        return this.jzmsylqkInput.getAttribute('value');
    };

    setJzysjsInput = function(jzysjs) {
        this.jzysjsInput.sendKeys(jzysjs);
    };

    getJzysjsInput = function() {
        return this.jzysjsInput.getAttribute('value');
    };

    setFzrdhInput = function(fzrdh) {
        this.fzrdhInput.sendKeys(fzrdh);
    };

    getFzrdhInput = function() {
        return this.fzrdhInput.getAttribute('value');
    };

    setXbSelect = function(xb) {
        this.xbSelect.sendKeys(xb);
    };

    getXbSelect = function() {
        return this.xbSelect.element(by.css('option:checked')).getText();
    };

    xbSelectLastOption = function() {
        this.xbSelect.all(by.tagName('option')).last().click();
    };
    setLxfsInput = function(lxfs) {
        this.lxfsInput.sendKeys(lxfs);
    };

    getLxfsInput = function() {
        return this.lxfsInput.getAttribute('value');
    };

    setEmailInput = function(email) {
        this.emailInput.sendKeys(email);
    };

    getEmailInput = function() {
        return this.emailInput.getAttribute('value');
    };

    setFzrnlSelect = function(fzrnl) {
        this.fzrnlSelect.sendKeys(fzrnl);
    };

    getFzrnlSelect = function() {
        return this.fzrnlSelect.element(by.css('option:checked')).getText();
    };

    fzrnlSelectLastOption = function() {
        this.fzrnlSelect.all(by.tagName('option')).last().click();
    };
    setTdpjnlSelect = function(tdpjnl) {
        this.tdpjnlSelect.sendKeys(tdpjnl);
    };

    getTdpjnlSelect = function() {
        return this.tdpjnlSelect.element(by.css('option:checked')).getText();
    };

    tdpjnlSelectLastOption = function() {
        this.tdpjnlSelect.all(by.tagName('option')).last().click();
    };
    setGjrcsInput = function(gjrcs) {
        this.gjrcsInput.sendKeys(gjrcs);
    };

    getGjrcsInput = function() {
        return this.gjrcsInput.getAttribute('value');
    };

    setSfgjrzgxjsqySelect = function(sfgjrzgxjsqy) {
        this.sfgjrzgxjsqySelect.sendKeys(sfgjrzgxjsqy);
    };

    getSfgjrzgxjsqySelect = function() {
        return this.sfgjrzgxjsqySelect.element(by.css('option:checked')).getText();
    };

    sfgjrzgxjsqySelectLastOption = function() {
        this.sfgjrzgxjsqySelect.all(by.tagName('option')).last().click();
    };
    setTdysjsInput = function(tdysjs) {
        this.tdysjsInput.sendKeys(tdysjs);
    };

    getTdysjsInput = function() {
        return this.tdysjsInput.getAttribute('value');
    };

    setXyczInput = function(xycz) {
        this.xyczInput.sendKeys(xycz);
    };

    getXyczInput = function() {
        return this.xyczInput.getAttribute('value');
    };

    setWlxwhdzclxInput = function(wlxwhdzclx) {
        this.wlxwhdzclxInput.sendKeys(wlxwhdzclx);
    };

    getWlxwhdzclxInput = function() {
        return this.wlxwhdzclxInput.getAttribute('value');
    };

    setWlxwhdzclx1Input = function(wlxwhdzclx1) {
        this.wlxwhdzclx1Input.sendKeys(wlxwhdzclx1);
    };

    getWlxwhdzclx1Input = function() {
        return this.wlxwhdzclx1Input.getAttribute('value');
    };

    setSfxyxcInput = function(sfxyxc) {
        this.sfxyxcInput.sendKeys(sfxyxc);
    };

    getSfxyxcInput = function() {
        return this.sfxyxcInput.getAttribute('value');
    };

    setRzjhgkfwSelect = function(rzjhgkfw) {
        this.rzjhgkfwSelect.sendKeys(rzjhgkfw);
    };

    getRzjhgkfwSelect = function() {
        return this.rzjhgkfwSelect.element(by.css('option:checked')).getText();
    };

    rzjhgkfwSelectLastOption = function() {
        this.rzjhgkfwSelect.all(by.tagName('option')).last().click();
    };
    setRzmbSelect = function(rzmb) {
        this.rzmbSelect.sendKeys(rzmb);
    };

    getRzmbSelect = function() {
        return this.rzmbSelect.element(by.css('option:checked')).getText();
    };

    rzmbSelectLastOption = function() {
        this.rzmbSelect.all(by.tagName('option')).last().click();
    };
    setLxrzwInput = function(lxrzw) {
        this.lxrzwInput.sendKeys(lxrzw);
    };

    getLxrzwInput = function() {
        return this.lxrzwInput.getAttribute('value');
    };

    setLxdhInput = function(lxdh) {
        this.lxdhInput.sendKeys(lxdh);
    };

    getLxdhInput = function() {
        return this.lxdhInput.getAttribute('value');
    };

    setLxyxInput = function(lxyx) {
        this.lxyxInput.sendKeys(lxyx);
    };

    getLxyxInput = function() {
        return this.lxyxInput.getAttribute('value');
    };

    setLxdzInput = function(lxdz) {
        this.lxdzInput.sendKeys(lxdz);
    };

    getLxdzInput = function() {
        return this.lxdzInput.getAttribute('value');
    };

    setSsly1Input = function(ssly1) {
        this.ssly1Input.sendKeys(ssly1);
    };

    getSsly1Input = function() {
        return this.ssly1Input.getAttribute('value');
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
