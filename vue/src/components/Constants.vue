<script>
export const NAVIGATION = [
  {
    code: 'TOP', //A00
    title: '全体状況',
    disabled: false,
    child: [
      { code: 'A00', title: '全体状況', disabled: false, page: { name: 'Dashboard' } },
    ],
  },
  {
    code: 'A',
    title: '新規貸出管理',
    disabled: false,
    child: [
      { code: 'A01', title: '新規貸出一覧', disabled: false, page: { name: 'RentIndex' } },
      { code: 'A02', title: '受注管理', disabled: false, page: { name: 'RentOrder' } },
      { code: 'A03', title: '出荷管理', disabled: false, page: { name: 'RentShipping' } },
      { code: 'A04', title: '同意書登録', disabled: false, page: { name: 'RentConfirmOrder' } },
    ],
  },
  {
    code: 'B',
    title: 'PR実績管理',
    disabled: false,
    child: [
      { code: 'B01', title: 'PR実績一覧', disabled: false, page: { name: 'AchievementIndex' } },
      // { code: 'B02', title: '患者転院処理', disabled: false, page: { name: 'AchievementSchedule' } },
      { code: 'B03', title: '患者転院処理', disabled: false, page: { name: 'AchievementChange' } },
      { code: 'B04', title: '故障交換処理', disabled: false, page: { name: 'AchievementFault' } },
      { code: 'B05', title: '中止・中断管理', disabled: false, page: { name: 'AchievementCancel' } },
      // { code: 'CXX', title: '故障交換情報詳細', disabled: false, page:{name:''}},
    ],
  },
  {
    code: 'C',
    title: '定期交換管理',
    disabled: false,
    child: [
      { code: 'C01', title: '定期交換一覧', disabled: false, page: { name: 'ExchangeIndex' } },
      { code: 'C02', title: '案内管理', disabled: false, page: { name: 'ExchangeGuide' } },
      // { code: 'C03', title: '依頼書登録', disabled: false, page: { name: 'ExchangeRegister' } },
      { code: 'C04', title: '出荷管理', disabled: false, page: { name: 'ExchangeShipping' } },
      { code: 'C05', title: '同意書登録', disabled: false, page: { name: 'ExchangeApproved' } },
    ],
  },
  {
    code: 'D',
    title: '在庫管理',
    disabled: false,
    child: [
      { code: 'D01', title: 'ポンプ在庫管理', disabled: false, page: { name: 'StockIndex' } },
      { code: 'D02', title: 'ポンプ入庫管理', disabled: false, page: { name: 'ReceiptManagement' } },
      { code: 'D03', title: 'ポンプ在庫予測', disabled: false, page: { name: 'StockForecast' } },
      { code: 'D04', title: '入出庫履歴', disabled: false, page: { name: 'StockStatus' } },
      // { code: 'D04', title: 'YLC情報取込', disabled: false, page: { name: 'StockYLCInformation' } },
      // { code: 'D05', title: '譲渡と譲受記録', disabled: false, page: { name: 'StockTransferBuyAgain' } },
    ],
  },
  {
    code: 'E',
    title: '請求管理',
    disabled: true,
    child: [
      { code: 'E01', title: '請求データ', disabled: false, page: { name: 'PaymentIndex' } },
      { code: 'E02', title: '請求書作成', disabled: false, page: { name: 'PaymentClaim' } },
      // { code: 'E03', title: '仕切情報管理', disabled: false, page: { name: 'PaymentPartition' } },
      // { code: 'E04', title: '請求マスタ管理', disabled: false, page: { name: 'PaymentMasterClaim' } },
    ],
  },
  {
    code: 'F',
    title: '契約管理',
    disabled: false,
    child: [
      { code: 'F01', title: '契約一覧', disabled: false, page: { name: 'ContractManagement' } },
      { code: 'F02', title: '年度更新', disabled: false, page: { name: 'ContractInformation' } }
    ],
  },
  {
    code: 'G',
    title: '各種マスタ管理',
    disabled: false,
    child: [
      { code: 'G01', title: '施設と納入先', disabled: false, page: { name: 'MasterFacilityDelivery' } },
      { code: 'G01', title: '患者情報管理', disabled: false, page: { name: 'MasterPatients' } },
      { code: 'G02', title: '商品情報管理', disabled: false, page: { name: 'MasterProducts' } },
      { code: 'G04', title: 'パラメータ設定', disabled: false, page: { name: 'MasterConfigs' } },
    ],
  },
];

export const RENT_DETAIL_HEADER = '詳細情報';
export const FAILURE_DETAIL_HEADER = '故障交換管理(詳細)';
export const EXCHANGE_DETAIL_HEADER = '詳細情報';
export const CONTRACT_STATUS = {
  0: 'ー',
  1: '〇',
  2: '◎',
  8: '▲',
  9: '×',
};
export const CONTRACT_STATUS_LABEL = {
  0: 'ー未締結',
  1: '〇到着待ち',
  2: '◎締結済',
  8: '▲期限終了',
  9: '×契約終了',
};

export const TRANSIT_RENT        = 1;
export const TRANSIT_FACILITY    = 2;
export const TRANSIT_ACHIEVEMENT = 3;
export const TRANSIT_EXCHANGE    = 4;
export const TRANSIT_SCHEDULE    = 5;

export const ROW_LIMITS = [
  {id: 100, text: '100件'},
  {id: 200, text: '200件'},
  {id: 500, text: '500件'},
  {id: 1000, text: '1000件'},
]

export const SIMILAR = '(同様)';

export const HISTORY_STATUS_ACTIVE = 1;

export const SEX_UNSET = 9;
export const SEX_MALE = 0;
export const SEX_FEMALE = 1;

export const STATUS_CONTRACT_START = 0;
export const STATUS_SEND_CONTRACT = 1;
export const STATUS_BE_SIGNED = 2;
export const STATUS_NO_RENEW = 8;
export const STATUS_STOP_BY_PARTNER = 9;

export const DES_TITLE_SAMA   = '先生';
export const DES_TITLE_SENSEI = '様';

export const SHIPMENT_STATUS_OUTPUT = 2;

// list group of new_rental detail
export const GROUP_PRE      = 'pre'
export const GROUP_TREAT    = 'treat'
export const GROUP_ORD      = 'ord'
export const GROUP_SHIPMENT = 'shipment'
export const GROUP_INST     = 'inst'
export const GROUP_ARG      = 'arg'
export const GROUP_PATIENT  = 'patient'
export const TODO_FLAG = {
  0: '-',
  1: '在庫移動',
  4: '売却出荷',
  5: '破棄出荷',
  6: '点検出荷',
  7: '修理出荷'
};
export const ARRIVAL_CLASS = [
  {id: 1, text: '新規入荷'},
  {id: 2, text: '点検後入庫'},
  {id: 3, text: '修理後入庫'},
  {id: 4, text: '回収入庫'},
  {id: 7, text: '在庫移動'}
];
export const EVENT_CODE = [
  {id: 1, text: '新規'},
  {id: 2, text: '点検'},
  {id: 3, text: '修理'},
  {id: 4, text: '定期'},
  {id: 5, text: '故障'},
  {id: 6, text: '中止'},
  {id: 7, text: '移動'},
  {id: 8, text: '売却'},
  {id: 9, text: '廃棄'},
];
</script>
