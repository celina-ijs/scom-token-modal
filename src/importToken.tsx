import {
  customElements,
  Control,
  ControlElement,
  Module,
  Modal,
  observable,
  Button,
  Container,
  Checkbox,
  Styles
} from '@ijstech/components'; 
import { Wallet } from '@ijstech/eth-wallet';
import { ITokenObject } from '@scom/scom-token-list';
import { viewOnExplorerByAddress } from './utils';

const Theme = Styles.Theme.ThemeVars;

declare global {
	namespace JSX {
		interface IntrinsicElements {
			['import-token']: ControlElement;
		}
	}
};

@customElements('import-token')
export class ImportToken extends Module {
  private importModal: Modal;
  private importBtn: Button;
  private tokenAgreeCheckBox: Checkbox;
  private _token: ITokenObject;
  public onUpdate: any;

  @observable()
  private _state = {
    address: '',
    name: ''
  }

  constructor(parent?: Container, options?: any) {
    super(parent, options);
  };

  set token(value: ITokenObject) {
    this._token = value;
    this.updateState();
  }

  get token() {
    return this._token;
  }

  updateState() {
    this._state.address = this.token.address || '';
    this._state.name = this.token.name || '';
  }

  closeModal() {
    this.importModal.visible = false;
  }

  showModal() {
    this.importModal.visible = true;
  }

  async onImportToken(source: Control, event: Event) {
    event.stopPropagation();
    const tokenObj = this.token;
    // const chainId = getChainId();
    // addUserTokens(chainId, tokenObj);
    // const rpcWallet = getRpcWallet();
    // tokenStore.updateTokenMapData(chainId);
    // await tokenStore.updateAllTokenBalances(rpcWallet);
    if (typeof this.onUpdate === 'function') {
      this.onUpdate(tokenObj);
    }
    this.closeModal();
  }

  onHandleCheck(source: Control, event: Event) {
    this.importBtn.enabled = (source as Checkbox).checked;
  }

  viewContract() {
    const chainId = Wallet.getClientInstance().chainId;
    viewOnExplorerByAddress(chainId, this._state.address);
  }

  async init() {
    super.init();
    this.importModal.onClose = () => {
      this.tokenAgreeCheckBox.checked = false;
      this.importBtn.enabled = false;
    }
  }
  
  render() {
		return (
      <i-modal id="importModal" class="bg-modal" title="Select Token" closeIcon={{ name: 'times' }}>
        <i-panel class="pnl-token-import">
          <i-panel>
            <i-icon name="question" class="cicrle" fill="#e83e8c" width={15} height={15} margin={{ right: 3 }}></i-icon>
            <i-label caption={this._state.name}/>
          </i-panel>
          <i-hstack margin={{ top: 5, bottom: 5 }}>
            <i-label caption={this._state.address}
              font={{ color: '#1890ff' }}
              class="pointer"
              onClick={() => this.viewContract()}
            />
          </i-hstack>
          <i-panel class="btn-source-panel">
            <i-icon name="exclamation-triangle" margin={{ right: 3 }} fill="#fff" width={15} height={15} />
            <i-label caption="Unknow Source"/>
          </i-panel>
        </i-panel>
        <i-panel class="pnl-token-import">
          <i-hstack  horizontalAlignment="center" margin={{ bottom: 5 }}> 
            <i-icon name="exclamation-triangle" margin={{ right: 3 }} fill="#e83e8c" width={30} height={30} />
          </i-hstack>
          <i-hstack  horizontalAlignment="center" class="text-center" margin={{ bottom: 5 }}> 
            <i-label font={{bold:true}} caption="Trade at your own risk!"/> 
          </i-hstack>
          <i-hstack  horizontalAlignment="center" class="text-center" margin={{ bottom: 5 }}> 
            <i-label caption="Anyone can create a token, including creating fake versions of existing token that claims tp represent projects"/> 
          </i-hstack>
          <i-hstack  horizontalAlignment="center" class="text-center" margin={{ bottom: 5 }}> 
            <i-label width={300} font={{bold:true}} caption="If you purchased this token, you may not be to able sell it back"/> 
          </i-hstack>
          <i-hstack  horizontalAlignment="center" class="text-center">
            <i-checkbox
              id="tokenAgreeCheckBox"
              width="200"
              margin={{ top: 30 }}
              height={30}
              class="token-agree-input"
              background={{ color: 'transparent' }}
              caption="I understand"
              onChanged={this.onHandleCheck.bind(this)}
            />
          </i-hstack>
        </i-panel>
        <i-button
          id="importBtn"
          width="100%"
          caption="Import"
          height={40}
          border={{radius: 5}}
          background={{color: Theme.background.gradient}}
          font={{color: Theme.colors.primary.contrastText, size: '1rem'}}
          padding={{top: '0.25rem', bottom: '0.25rem', left: '1.25rem', right: '1.25rem'}}
          enabled={false}
          onClick={this.onImportToken.bind(this)}
        />
      </i-modal>
		)
	}
}
