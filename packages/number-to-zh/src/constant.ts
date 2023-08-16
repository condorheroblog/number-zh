// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getNumberingSystems#supported_numbering_system_types

export const ZH_CN_LOWER_CASE_DIGITS_LIST = ["", "十", "百", "千"];
export const ZH_CN_LOWER_CASE_MAGNITUDE_LIST = ["", "万", "亿"];
export const ZH_CN_LOWER_CASE_MINUS_SIGN = "负";
export const ZH_CN_LOWER_CASE_DECIMAL_POINT = "点";
export const ZH_CN_LOWER_CASE_BASE_CHINESE_NUMERALS = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];

export const ZH_CN_UPPER_CASE_DIGITS_LIST = ["", "拾", "佰", "仟"];
export const ZH_CN_UPPER_CASE_MAGNITUDE_LIST = ["", "万", "亿"];
export const ZH_CN_UPPER_CASE_MINUS_SIGN = "负";
export const ZH_CN_UPPER_CASE_DECIMAL_POINT = "点";
export const ZH_CN_UPPER_CASE_BASE_CHINESE_NUMERALS = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];

export const ZH_TW_LOWER_CASE_DIGITS_LIST = ["", "十", "百", "千"];
export const ZH_TW_LOWER_CASE_MAGNITUDE_LIST = ["", "萬", "億", "兆"];
export const ZH_TW_LOWER_CASE_MINUS_SIGN = "負";
export const ZH_TW_LOWER_CASE_DECIMAL_POINT = "點";
export const ZH_TW_LOWER_CASE_BASE_CHINESE_NUMERALS = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];

export const ZH_TW_UPPER_CASE_DIGITS_LIST = ["", "拾", "佰", "仟"];
export const ZH_TW_UPPER_CASE_MAGNITUDE_LIST = ["", "萬", "億", "兆"];
export const ZH_TW_UPPER_CASE_MINUS_SIGN = "負";
export const ZH_TW_UPPER_CASE_DECIMAL_POINT = "點";
export const ZH_TW_UPPER_CASE_BASE_CHINESE_NUMERALS = ["零", "壹", "貳", "參", "肆", "伍", "陸", "柒", "捌", "玖"];

export const RESOURCES = {
	"zh-CN-lowercase": {
		digitsList: ZH_CN_LOWER_CASE_DIGITS_LIST,
		magnitudeList: ZH_CN_LOWER_CASE_MAGNITUDE_LIST,
		minusSign: ZH_CN_LOWER_CASE_MINUS_SIGN,
		decimalPoint: ZH_CN_LOWER_CASE_DECIMAL_POINT,
		baseNumerals: ZH_CN_LOWER_CASE_BASE_CHINESE_NUMERALS,
	},
	"zh-CN-uppercase": {
		digitsList: ZH_CN_UPPER_CASE_DIGITS_LIST,
		magnitudeList: ZH_CN_UPPER_CASE_MAGNITUDE_LIST,
		minusSign: ZH_CN_UPPER_CASE_MINUS_SIGN,
		decimalPoint: ZH_CN_UPPER_CASE_DECIMAL_POINT,
		baseNumerals: ZH_CN_UPPER_CASE_BASE_CHINESE_NUMERALS,
	},
	"zh-TW-lowercase": {
		digitsList: ZH_TW_LOWER_CASE_DIGITS_LIST,
		magnitudeList: ZH_TW_LOWER_CASE_MAGNITUDE_LIST,
		minusSign: ZH_TW_LOWER_CASE_MINUS_SIGN,
		decimalPoint: ZH_TW_LOWER_CASE_DECIMAL_POINT,
		baseNumerals: ZH_TW_LOWER_CASE_BASE_CHINESE_NUMERALS,
	},
	"zh-TW-uppercase": {
		digitsList: ZH_TW_UPPER_CASE_DIGITS_LIST,
		magnitudeList: ZH_TW_UPPER_CASE_MAGNITUDE_LIST,
		minusSign: ZH_TW_UPPER_CASE_MINUS_SIGN,
		decimalPoint: ZH_TW_UPPER_CASE_DECIMAL_POINT,
		baseNumerals: ZH_TW_UPPER_CASE_BASE_CHINESE_NUMERALS,
	},
	"zh-HK-lowercase": {
		digitsList: ZH_TW_LOWER_CASE_DIGITS_LIST,
		magnitudeList: ZH_TW_LOWER_CASE_MAGNITUDE_LIST,
		minusSign: ZH_TW_LOWER_CASE_MINUS_SIGN,
		decimalPoint: ZH_TW_LOWER_CASE_DECIMAL_POINT,
		baseNumerals: ZH_TW_LOWER_CASE_BASE_CHINESE_NUMERALS,
	},
	"zh-HK-uppercase": {
		digitsList: ZH_TW_UPPER_CASE_DIGITS_LIST,
		magnitudeList: ZH_TW_UPPER_CASE_MAGNITUDE_LIST,
		minusSign: ZH_TW_UPPER_CASE_MINUS_SIGN,
		decimalPoint: ZH_TW_UPPER_CASE_DECIMAL_POINT,
		baseNumerals: ZH_TW_UPPER_CASE_BASE_CHINESE_NUMERALS,
	},
};
