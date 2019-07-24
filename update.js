/* YGOPro Percy Script Moderniser
 * by AlphaKretin, November 2018
 * Applies modern script standard updates to YGOPro card script files.
 * For usage and notes, see the readme.
 */

// replaces the "cID" and card's ID with the s,id from the new GetID() function
async function updateGetID(file, fileName) {
    const EXTRACT_S = /c\d+/g; // the "s", or cID.
    const GET_ID_LOCATION = /(\r|\n|\r\n)function s\.initial_effect\(c\)/; // the location to insert the GetID() function, before the initial effect declaration
    const GET_ID = /GetID\(\)/; // checks if script already has a GetID() call
    const sResult = EXTRACT_S.exec(fileName);
    if (!sResult || GET_ID.test(file)) {
        // e.g. utility, constant, do not modify - though those shouldn't be run through this anyway
        return file;
    }
    const s = sResult[0];
    const sReg = new RegExp(s, "g");
    const id = s.substr(1); // the "s" is the letter c followed by the ID
    const idReg = new RegExp(id, "g");
    file = file.replace(sReg, "s");
    file = file.replace(idReg, "id");
    const idNum = parseInt(id);
    if (!isNaN(idNum)) {
        const idPlusOne = (idNum + 1).toString(); // e.g. multiple HOPT or token
        const iPOReg = new RegExp(idPlusOne, "g");
        const idPlusHundred = (idNum + 100).toString(); // e.g. beta HOPT
        const iPHReg = new RegExp(idPlusHundred, "g");
        file = file.replace(iPOReg, "id+1");
        file = file.replace(iPHReg, "id+100");
    }
    const getIDResult = GET_ID_LOCATION.exec(file);
    if (getIDResult === null) {
        // File starts with function declaration
        const ALTERNATE_LOCATION = /function s\.initial_effect\(c\)(\r|\n|\r\n)/;
        const newResult = ALTERNATE_LOCATION.exec(file);
        if (newResult !== null) {
            const initialEffect = newResult[0]; // whole match needs to be reinserted with the additions
            const newLine = newResult[1]; // capture group is newline, keep consistent with source when inserting
            file = file.replace(ALTERNATE_LOCATION, "local s,id=GetID()" + newLine + initialEffect);
        } else {
            console.log("Something's really wrong with " + fileName + "!");
        }
    } else {
        const initialEffect = getIDResult[0]; // whole match needs to be reinserted with the additions
        const newLine = getIDResult[1]; // capture group is newline, keep consistent with source when inserting
        file = file.replace(GET_ID_LOCATION, newLine + "local s,id=GetID()" + initialEffect);
    }
    return file;
}

const SIMPLE_MAP = {
    "0x1fe0000": "RESETS_STANDARD",
    "0x1ff0000": "RESETS_STANDARD_DISABLE",
    "0x1fc0000": "RESETS_STANDARD-RESET_TURN_SET",
    "0x47e0000": "RESETS_REDIRECT",
    "0x17a0000": "RESETS_STANDARD_EXC_GRAVE",
    "0x17e0000": "RESETS_CANNOT_ACT",
    "0xfe0000": "RESETS_STANDARD-RESET_TOFIELD",
    "0xfc0000": "RESETS_STANDARD-(RESET_TOFIELD+RESET_TURN_SET)",
    "0xec0000": "RESETS_STANDARD-(RESET_TOFIELD+RESET_TEMP_REMOVE+RESET_TURN_SET)",
    "0x4011": "TYPES_TOKEN",
    "RACE_PSYCHO": "RACE_PSYCHIC",
    "RACE_WINDBEAST": "RACE_WINGEDBEAST",
    "RACE_DEVINE": "RACE_DIVINE",
    "RACE_CYBERS": "RACE_CYBERSE",
    "ATTRIBUTE_DEVINE": "ATTRIBUTE_DIVINE",
    "POS_FACEUP_DEFENCE": "POS_FACEUP_DEFENSE",
    "POS_FACEDOWN_DEFENCE": "POS_FACEDOWN_DEFENSE",
    "SUMMON_TYPE_ADVANCE": "SUMMON_TYPE_TRIBUTE",
    "SUMMON_TYPE_DUAL": "SUMMON_TYPE_GEMINI",
    "59822133": "CARD_BLUEEYES_SPIRIT",
    "29724053": "CARD_SUMMON_GATE",
    "24094653": "CARD_POLYMERIZATION",
    "47355498": "CARD_NECROVALLEY",
    "56433456": "CARD_SANCTUARY_SKY",
    "22702055": "CARD_UMI",
    "46986414": "CARD_DARK_MAGICIAN",
    "38033121": "CARD_DARK_MAGICIAN_GIRL",
    "89631139": "CARD_BLUEEYES_W_DRAGON",
    "93717133": "CARD_GALAXYEYES_P_DRAGON",
    "70095154": "CARD_CYBER_DRAGON",
    "74677422": "CARD_REDEYES_B_DRAGON",
    "72283691": "CARD_STROMBERG",
    "89943723": "CARD_NEOS",
    "90351981": "CARD_ORPHEGEL_BABEL",
    "70781052": "CARD_SUMMONED_SKULL",
    "76812113": "CARD_HARPIE_LADY",
    "12206212": "CARD_HARPIE_LADY_SISTERS",
    "1295111": "CARD_SALAMANGREAT_SANCTUARY",
    "8802510": "CARD_PSYFRAME_LAMBDA",
    "49036338": "CARD_PSYFRAME_DRIVER",
    "46241344": "CARD_FIRE_FIST_EAGLE",
    "80280737": "CARD_ASSAULT_MODE",
    "15610297": "CARD_VIJAM",
    "Auxiliary.TuneMagFilterFus": "Auxiliary.HarmonizingMagFilter",
    "Auxiliary.TuneMagFilter": "Auxiliary.HarmonizingMagFilter",
    "Auxiliary.AddFusionProcMix": "Fusion.AddProcMix",
    "Auxiliary.FConditionMix": "Fusion.ConditionMix",
    "Auxiliary.FOperationMix": "Fusion.OperationMix",
    "Auxiliary.FConditionFilterMix": "Fusion.ConditionFilterMix",
    "Auxiliary.FCheckMix": "Fusion.CheckMix",
    "Auxiliary.FCheckExact": "Fusion.CheckExact",
    "Auxiliary.FCheckAdditional": "Fusion.CheckAdditional",
    "Auxiliary.FCheckMixGoal": "Fusion.CheckMixGoal",
    "Auxiliary.FSelectMix": "Fusion.SelectMix",
    "Auxiliary.AddFusionProcMixRep": "Fusion.AddProcMixRep",
    "Auxiliary.FConditionMixRep": "Fusion.ConditionMixRep",
    "Auxiliary.FOperationMixRep": "Fusion.OperationMixRep",
    "Auxiliary.FCheckMixRep": "Fusion.CheckMixRep",
    "Auxiliary.FCheckMixRepFilter": "Fusion.CheckMixRepFilter",
    "Auxiliary.FCheckMixRepGoal": "Fusion.CheckMixRepGoal",
    "Auxiliary.FCheckMixRepTemplate": "Fusion.CheckMixRepTemplate",
    "Auxiliary.FCheckMixRepSelectedCond": "Fusion.CheckMixRepSelectedCond",
    "Auxiliary.FCheckMixRepSelected": "Fusion.CheckMixRepSelected",
    "Auxiliary.FCheckSelectMixRep": "Fusion.CheckSelectMixRep",
    "Auxiliary.FCheckSelectMixRepAll": "Fusion.CheckSelectMixRepAll",
    "Auxiliary.FCheckSelectMixRepM": "Fusion.CheckSelectMixRepM",
    "Auxiliary.FSelectMixRep": "Fusion.SelectMixRep",
    "Auxiliary.AddFusionProcMixRepUnfix": "Fusion.AddProcMixRepUnfix",
    "Auxiliary.FConditionMixRepUnfix": "Fusion.ConditionMixRepUnfix",
    "Auxiliary.FOperationMixRepUnfix": "Fusion.OperationMixRepUnfix",
    "Auxiliary.FConditionFilterMixRepUnfix": "Fusion.ConditionFilterMixRepUnfix",
    "Auxiliary.FCheckMixRepUnfixTemplate": "Fusion.CheckMixRepUnfixTemplate",
    "Auxiliary.FCheckMixRepUnfixSelectedCond": "Fusion.CheckMixRepUnfixSelectedCond",
    "Auxiliary.FCheckMixRepUnfixSelected": "Fusion.CheckMixRepUnfixSelected",
    "Auxiliary.FCheckSelectMixRepUnfix": "Fusion.CheckSelectMixRepUnfix",
    "Auxiliary.FCheckSelectMixRepUnfixAll": "Fusion.CheckSelectMixRepUnfixAll",
    "Auxiliary.FCheckSelectMixRepUnfixM": "Fusion.CheckSelectMixRepUnfixM",
    "Auxiliary.FSelectMixRepUnfix": "Fusion.SelectMixRepUnfix",
    "Auxiliary.AddContactFusion": "Fusion.AddContactProc",
    "Auxiliary.ContactCon": "Fusion.ContactCon",
    "Auxiliary.ContactTg": "Fusion.ContactTg",
    "Auxiliary.ContactOp": "Fusion.ContactOp",
    "Auxiliary.AddFusionProcCode2": "Fusion.AddProcCode2",
    "Auxiliary.AddFusionProcCode3": "Fusion.AddProcCode3",
    "Auxiliary.AddFusionProcCode4": "Fusion.AddProcCode4",
    "Auxiliary.AddFusionProcCodeRep": "Fusion.AddProcCodeRep",
    "Auxiliary.AddFusionProcCodeRep2": "Fusion.AddProcCodeRep2",
    "Auxiliary.AddFusionProcCodeFun": "Fusion.AddProcCodeFun",
    "Auxiliary.AddFusionProcFun2": "Fusion.AddProcFun2",
    "Auxiliary.AddFusionProcFunRep": "Fusion.AddProcFunRep",
    "Auxiliary.AddFusionProcFunRep2": "Fusion.AddProcFunRep2",
    "Auxiliary.AddFusionProcFunFun": "Fusion.AddProcFunFun",
    "Auxiliary.AddFusionProcFunFunRep": "Fusion.AddProcFunFunRep",
    "Auxiliary.AddFusionProcCodeFunRep": "Fusion.AddProcCodeFunRep",
    "Auxiliary.AddFusionProcCode2FunRep": "Fusion.AddProcCode2FunRep",
    "Auxiliary.AddFusionProcMixN": "Fusion.AddProcMixN",
    "Auxiliary.AddShaddollFusionProcMix": "Fusion.AddShaddolProcMix",
    "Auxiliary.ShaddollExFilter": "Fusion.ShaddollExFilter",
    "Auxiliary.ShaddollRecursion": "Fusion.ShaddollRecursion",
    "Auxiliary.ShaddollFCondition": "Fusion.ShaddolCondition",
    "Auxiliary.ShaddollFilter2": "Fusion.ShaddollFilter2",
    "Auxiliary.ShaddollFilter3": "Fusion.ShaddollFilter3",
    "Auxiliary.ShaddollFOperation": "Fusion.ShaddolOperation",
    "Auxiliary.AddLinkProcedure": "Link.AddProcedure",
    "Auxiliary.LConditionFilter": "Link.ConditionFilter",
    "Auxiliary.GetLinkCount": "Link.GetLinkCount",
    "Auxiliary.LCheckRecursive": "Link.CheckRecursive",
    "Auxiliary.LCheckRecursive2": "Link.CheckRecursive2",
    "Auxiliary.LCheckGoal": "Link.CheckGoal",
    "Auxiliary.LinkCondition": "Link.Condition",
    "Auxiliary.LinkTarget": "Link.Target",
    "Auxiliary.LinkOperation": "Link.Operation",
    "Auxiliary.CheckForcedGroup": "Ritual.CheckForcedGroup",
    "Auxiliary.AddRitualProcGreater": "Ritual.AddProcGreater",
    "Auxiliary.RPGFilter": "Ritual.GreaterFilter",
    "Auxiliary.RPGFilterF": "Ritual.GreaterFilterF",
    "Auxiliary.RPGTarget": "Ritual.GreaterTarget",
    "Auxiliary.RPGOperation": "Ritual.GreaterOperation",
    "Auxiliary.AddRitualProcGreaterCode": "Ritual.AddProcGreaterCode",
    "Auxiliary.AddRitualProcEqual": "Ritual.AddProcEqual",
    "Auxiliary.RPEFilter": "Ritual.EqualFilter",
    "Auxiliary.RPEFilterF": "Ritual.EqualFilterF",
    "Auxiliary.RPETarget": "Ritual.EqualTarget",
    "Auxiliary.RPEOperation": "Ritual.EqualOperation",
    "Auxiliary.AddRitualProcEqualCode": "Ritual.AddProcEqualCode",
    "Auxiliary.NonTuner": "Synchro.NonTuner",
    "Auxiliary.NonTunerEx": "Synchro.NonTunerEx",
    "Auxiliary.NonTunerCode": "Synchro.NonTunerCode",
    "Auxiliary.AddSynchroProcedure": "Synchro.AddProcedure",
    "Auxiliary.SynchroCheckFilterChk": "Synchro.CheckFilterChk",
    "Auxiliary.TunerFilter": "Synchro.TunerFilter",
    "Auxiliary.NonTunerFilter": "Synchro.NonTunerFilter",
    "Auxiliary.SynCondition": "Synchro.Condition",
    "Auxiliary.SynchroCheckP31": "Synchro.CheckP31",
    "Auxiliary.SynchroCheckP32": "Synchro.CheckP32",
    "Auxiliary.SynchroCheckP41": "Synchro.CheckP41",
    "Auxiliary.SynchroCheckP42": "Synchro.CheckP42",
    "Auxiliary.SynchroCheckLabel": "Synchro.CheckLabel",
    "Auxiliary.SynchroCheckHand": "Synchro.CheckHand",
    "Auxiliary.SynchroCheckP43": "Synchro.CheckP43",
    "Auxiliary.SynTarget": "Synchro.Target",
    "Auxiliary.SynchroSend": "Synchro.Send",
    "Auxiliary.SynOperation": "Synchro.Operation",
    "Auxiliary.AddMajesticSynchroProcedure": "Synchro.AddMajesticProcedure",
    "Auxiliary.MajesticSynchroCheck1": "Synchro.MajesticCheck1",
    "Auxiliary.MajesticSynchroCheck2": "Synchro.MajesticCheck2",
    "Auxiliary.MajesticSynCondition": "Synchro.MajesticCondition",
    "Auxiliary.MajesticSynTarget": "Synchro.MajesticTarget",
    "Auxiliary.AddDarkSynchroProcedure": "Synchro.AddDarkSynchroProcedure",
    "Auxiliary.DarkSynchroCheck1": "Synchro.DarkCheck1",
    "Auxiliary.DarkSynchroCheck2": "Synchro.DarkCheck2",
    "Auxiliary.DarkSynCondition": "Synchro.DarkCondition",
    "Auxiliary.DarkSynTarget": "Synchro.DarkTarget",
    "Auxiliary.XyzAlterFilter": "Xyz.AlterFilter",
    "Auxiliary.AddXyzProcedure": "Xyz.AddProcedure",
    "Auxiliary.XyzMatGenerate": "Xyz.MatGenerate",
    "Auxiliary.XyzMatFilter2": "Xyz.MatFilter2",
    "Auxiliary.XyzMatFilter": "Xyz.MatFilter",
    "Auxiliary.XyzSubMatFilter": "Xyz.SubMatFilter",
    "Auxiliary.XyzSubFilterChk": "Xyz.SubFilterChk",
    "Auxiliary.CheckValidMultiXyzMaterial": "Xyz.CheckValidMultiXyzMaterial",
    "Auxiliary.XyzRecursionChk1": "Xyz.RecursionChk1",
    "Auxiliary.XyzRecursionChk2": "Xyz.RecursionChk2",
    "Auxiliary.MatNumChkF": "Xyz.MatNumChkF",
    "Auxiliary.MatNumChk": "Xyz.MatNumChk",
    "Auxiliary.MatNumChkF2": "Xyz.MatNumChkF2",
    "Auxiliary.TuneMagFilterXyz": "Xyz.HarmonizingMagFilterXyz",
    "Auxiliary.XyzCondition": "Xyz.Condition",
    "Auxiliary.XyzTarget": "Xyz.Target",
    "Auxiliary.XyzOperation": "Xyz.Operation",
    "Auxiliary.XyzCondition2": "Xyz.Condition2",
    "Auxiliary.XyzTarget2": "Xyz.Target2",
    "Auxiliary.XyzOperation2": "Xyz.Operation2",
    "aux.TuneMagFilterFus": "aux.HarmonizingMagFilter",
    "aux.TuneMagFilter": "aux.HarmonizingMagFilter",
    "aux.AddFusionProcMix": "Fusion.AddProcMix",
    "aux.FConditionMix": "Fusion.ConditionMix",
    "aux.FOperationMix": "Fusion.OperationMix",
    "aux.FConditionFilterMix": "Fusion.ConditionFilterMix",
    "aux.FCheckMix": "Fusion.CheckMix",
    "aux.FCheckExact": "Fusion.CheckExact",
    "aux.FCheckAdditional": "Fusion.CheckAdditional",
    "aux.FCheckMixGoal": "Fusion.CheckMixGoal",
    "aux.FSelectMix": "Fusion.SelectMix",
    "aux.AddFusionProcMixRep": "Fusion.AddProcMixRep",
    "aux.FConditionMixRep": "Fusion.ConditionMixRep",
    "aux.FOperationMixRep": "Fusion.OperationMixRep",
    "aux.FCheckMixRep": "Fusion.CheckMixRep",
    "aux.FCheckMixRepFilter": "Fusion.CheckMixRepFilter",
    "aux.FCheckMixRepGoal": "Fusion.CheckMixRepGoal",
    "aux.FCheckMixRepTemplate": "Fusion.CheckMixRepTemplate",
    "aux.FCheckMixRepSelectedCond": "Fusion.CheckMixRepSelectedCond",
    "aux.FCheckMixRepSelected": "Fusion.CheckMixRepSelected",
    "aux.FCheckSelectMixRep": "Fusion.CheckSelectMixRep",
    "aux.FCheckSelectMixRepAll": "Fusion.CheckSelectMixRepAll",
    "aux.FCheckSelectMixRepM": "Fusion.CheckSelectMixRepM",
    "aux.FSelectMixRep": "Fusion.SelectMixRep",
    "aux.AddFusionProcMixRepUnfix": "Fusion.AddProcMixRepUnfix",
    "aux.FConditionMixRepUnfix": "Fusion.ConditionMixRepUnfix",
    "aux.FOperationMixRepUnfix": "Fusion.OperationMixRepUnfix",
    "aux.FConditionFilterMixRepUnfix": "Fusion.ConditionFilterMixRepUnfix",
    "aux.FCheckMixRepUnfixTemplate": "Fusion.CheckMixRepUnfixTemplate",
    "aux.FCheckMixRepUnfixSelectedCond": "Fusion.CheckMixRepUnfixSelectedCond",
    "aux.FCheckMixRepUnfixSelected": "Fusion.CheckMixRepUnfixSelected",
    "aux.FCheckSelectMixRepUnfix": "Fusion.CheckSelectMixRepUnfix",
    "aux.FCheckSelectMixRepUnfixAll": "Fusion.CheckSelectMixRepUnfixAll",
    "aux.FCheckSelectMixRepUnfixM": "Fusion.CheckSelectMixRepUnfixM",
    "aux.FSelectMixRepUnfix": "Fusion.SelectMixRepUnfix",
    "aux.AddContactFusion": "Fusion.AddContactProc",
    "aux.ContactCon": "Fusion.ContactCon",
    "aux.ContactTg": "Fusion.ContactTg",
    "aux.ContactOp": "Fusion.ContactOp",
    "aux.AddFusionProcCode2": "Fusion.AddProcCode2",
    "aux.AddFusionProcCode3": "Fusion.AddProcCode3",
    "aux.AddFusionProcCode4": "Fusion.AddProcCode4",
    "aux.AddFusionProcCodeRep": "Fusion.AddProcCodeRep",
    "aux.AddFusionProcCodeRep2": "Fusion.AddProcCodeRep2",
    "aux.AddFusionProcCodeFun": "Fusion.AddProcCodeFun",
    "aux.AddFusionProcFun2": "Fusion.AddProcFun2",
    "aux.AddFusionProcFunRep": "Fusion.AddProcFunRep",
    "aux.AddFusionProcFunRep2": "Fusion.AddProcFunRep2",
    "aux.AddFusionProcFunFun": "Fusion.AddProcFunFun",
    "aux.AddFusionProcFunFunRep": "Fusion.AddProcFunFunRep",
    "aux.AddFusionProcCodeFunRep": "Fusion.AddProcCodeFunRep",
    "aux.AddFusionProcCode2FunRep": "Fusion.AddProcCode2FunRep",
    "aux.AddFusionProcMixN": "Fusion.AddProcMixN",
    "aux.AddShaddollFusionProcMix": "Fusion.AddShaddolProcMix",
    "aux.ShaddollExFilter": "Fusion.ShaddollExFilter",
    "aux.ShaddollRecursion": "Fusion.ShaddollRecursion",
    "aux.ShaddollFCondition": "Fusion.ShaddolCondition",
    "aux.ShaddollFilter2": "Fusion.ShaddollFilter2",
    "aux.ShaddollFilter3": "Fusion.ShaddollFilter3",
    "aux.ShaddollFOperation": "Fusion.ShaddolOperation",
    "aux.AddLinkProcedure": "Link.AddProcedure",
    "aux.LConditionFilter": "Link.ConditionFilter",
    "aux.GetLinkCount": "Link.GetLinkCount",
    "aux.LCheckRecursive": "Link.CheckRecursive",
    "aux.LCheckRecursive2": "Link.CheckRecursive2",
    "aux.LCheckGoal": "Link.CheckGoal",
    "aux.LinkCondition": "Link.Condition",
    "aux.LinkTarget": "Link.Target",
    "aux.LinkOperation": "Link.Operation",
    "aux.CheckForcedGroup": "Ritual.CheckForcedGroup",
    "aux.AddRitualProcGreater": "Ritual.AddProcGreater",
    "aux.RPGFilter": "Ritual.GreaterFilter",
    "aux.RPGFilterF": "Ritual.GreaterFilterF",
    "aux.RPGTarget": "Ritual.GreaterTarget",
    "aux.RPGOperation": "Ritual.GreaterOperation",
    "aux.AddRitualProcGreaterCode": "Ritual.AddProcGreaterCode",
    "aux.AddRitualProcEqual": "Ritual.AddProcEqual",
    "aux.RPEFilter": "Ritual.EqualFilter",
    "aux.RPEFilterF": "Ritual.EqualFilterF",
    "aux.RPETarget": "Ritual.EqualTarget",
    "aux.RPEOperation": "Ritual.EqualOperation",
    "aux.AddRitualProcEqualCode": "Ritual.AddProcEqualCode",
    "aux.NonTuner": "Synchro.NonTuner",
    "aux.NonTunerEx": "Synchro.NonTunerEx",
    "aux.NonTunerCode": "Synchro.NonTunerCode",
    "aux.AddSynchroProcedure": "Synchro.AddProcedure",
    "aux.SynchroCheckFilterChk": "Synchro.CheckFilterChk",
    "aux.TunerFilter": "Synchro.TunerFilter",
    "aux.NonTunerFilter": "Synchro.NonTunerFilter",
    "aux.SynCondition": "Synchro.Condition",
    "aux.SynchroCheckP31": "Synchro.CheckP31",
    "aux.SynchroCheckP32": "Synchro.CheckP32",
    "aux.SynchroCheckP41": "Synchro.CheckP41",
    "aux.SynchroCheckP42": "Synchro.CheckP42",
    "aux.SynchroCheckLabel": "Synchro.CheckLabel",
    "aux.SynchroCheckHand": "Synchro.CheckHand",
    "aux.SynchroCheckP43": "Synchro.CheckP43",
    "aux.SynTarget": "Synchro.Target",
    "aux.SynchroSend": "Synchro.Send",
    "aux.SynOperation": "Synchro.Operation",
    "aux.AddMajesticSynchroProcedure": "Synchro.AddMajesticProcedure",
    "aux.MajesticSynchroCheck1": "Synchro.MajesticCheck1",
    "aux.MajesticSynchroCheck2": "Synchro.MajesticCheck2",
    "aux.MajesticSynCondition": "Synchro.MajesticCondition",
    "aux.MajesticSynTarget": "Synchro.MajesticTarget",
    "aux.AddDarkSynchroProcedure": "Synchro.AddDarkSynchroProcedure",
    "aux.DarkSynchroCheck1": "Synchro.DarkCheck1",
    "aux.DarkSynchroCheck2": "Synchro.DarkCheck2",
    "aux.DarkSynCondition": "Synchro.DarkCondition",
    "aux.DarkSynTarget": "Synchro.DarkTarget",
    "aux.XyzAlterFilter": "Xyz.AlterFilter",
    "aux.AddXyzProcedure": "Xyz.AddProcedure",
    "aux.XyzMatGenerate": "Xyz.MatGenerate",
    "aux.XyzMatFilter2": "Xyz.MatFilter2",
    "aux.XyzMatFilter": "Xyz.MatFilter",
    "aux.XyzSubMatFilter": "Xyz.SubMatFilter",
    "aux.XyzSubFilterChk": "Xyz.SubFilterChk",
    "aux.CheckValidMultiXyzMaterial": "Xyz.CheckValidMultiXyzMaterial",
    "aux.XyzRecursionChk1": "Xyz.RecursionChk1",
    "aux.XyzRecursionChk2": "Xyz.RecursionChk2",
    "aux.MatNumChkF": "Xyz.MatNumChkF",
    "aux.MatNumChk": "Xyz.MatNumChk",
    "aux.MatNumChkF2": "Xyz.MatNumChkF2",
    "aux.TuneMagFilterXyz": "Xyz.HarmonizingMagFilterXyz",
    "aux.XyzCondition": "Xyz.Condition",
    "aux.XyzTarget": "Xyz.Target",
    "aux.XyzOperation": "Xyz.Operation",
    "aux.XyzCondition2": "Xyz.Condition2",
    "aux.XyzTarget2": "Xyz.Target2",
    "aux.XyzOperation2": "Xyz.Operation2"
};

// updates simple find-replaces such as new constants and renamed functions with the same params
async function updateSimple(file) {
    for (const key in SIMPLE_MAP) {
        const reg = new RegExp(key, "g");
        file = file.replace(reg, SIMPLE_MAP[key]);
    }
    return file;
}

const RegisterFlagRegex = i => new RegExp(":RegisterEffect\\((.+?),(?:false|true)," + i + "\\)", "g");

const REGISTER_FLAG_MAP = {
    1: "REGISTER_FLAG_DETACH_XMAT",
    2: "REGISTER_FLAG_CARDIAN",
    4: "REGISTER_FLAG_THUNDRA",
    8: "REGISTER_FLAG_ALLURE_LVUP"
};

async function updateRegisterFlags(file) {
    for (const key in REGISTER_FLAG_MAP) {
        const reg = RegisterFlagRegex(key);
        file = file.replace(reg, ":RegisterEffect($1,false," + REGISTER_FLAG_MAP[key] + ")");
    }
    return file;
}

// updates new operators like Group metamethods and lua 5.3 bitwise operators
async function updateOperators(file) {
    const GET_COUNT = /([a-zA-Z0-9]+?):GetCount\(\)/g;
    const BIT_BAND = /bit\.band\((.+?),(.+?)\)/g;
    const BIT_BOR = /bit\.bor\((.+?),(.+?)\)/g;
    const BIT_BXOR = /bit\.bxor\((.+?),(.+?)\)/g;
    const BIT_LSHIFT = /bit\.lshift\((.+?),(.+?)\)/g;
    const BIT_RSHIFT = /bit\.rshift\((.+?),(.+?)\)/g;
    const BIT_NOT = /bit\.not\((.+?)\)/g; // apparently unused
    file = file.replace(GET_COUNT, "#$1");
    file = file.replace(BIT_BAND, "($1&$2)");
    file = file.replace(BIT_BOR, "($1|$2)");
    file = file.replace(BIT_BXOR, "($1~$2)");
    file = file.replace(BIT_LSHIFT, "($1<<$2)");
    file = file.replace(BIT_RSHIFT, "($1>>$2)");
    file = file.replace(BIT_NOT, "(~$1)");
    return file;
}

// adds a list of listed card IDs to the file
async function updateListedNames(file) {
    const codeRegs = [/IsCode\(([0-9A-Z_]+)\)/g, /IsEnvironment\(([0-9A-Z_]+)\)/g, /IsOriginalCode\(([0-9A-Z_]+)\)/g, /IsOriginalCodeRule\(([0-9A-Z_]+)\)/g];
    const codes = [];
    for (const reg of codeRegs) {
        while ((result = reg.exec(file)) !== null) {
            if (codes.indexOf(result) < 0) {
                codes.push(result[1]);
            }
        }
    }
    if (codes.length > 0) {
        const listString = "s.listed_names={" + codes.filter((v,i,s) => s.indexOf(v)===i).join(",") + "}"
        const lines = file.split(/\r\n|\r|\n/);
        let insInd = -1;
        let listInd = -1;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i] === "end" && insInd < 0) {
                insInd = i;
            }
            if (lines[i].includes("listed_names")) {
                listInd = i;
                break;
            }
        }
        if (listInd > -1) {
            lines[listInd] = listString;
        } else if (insInd > -1) {
            lines.splice(insInd + 1, 0, listString);
        } else {
            lines.push(listString);
        }
        return lines.join("\r\n");
    }
    return file;
}

// adds a list of listed archetype codes to the file
async function updateListedSets(file) {
    const codeRegs = [/IsSetCard\(([0-9A-Z_]+)\)/g];
    const codes = [];
    for (const reg of codeRegs) {
        while ((result = reg.exec(file)) !== null) {
            if (codes.indexOf(result) < 0) {
                codes.push(result[1]);
            }
        }
    }
    if (codes.length > 0) {
        const listString = "s.listed_series={" + codes.filter((v,i,s) => s.indexOf(v)===i).join(",") + "}"
        const lines = file.split(/\r\n|\r|\n/);
        let insInd = -1;
        let listInd = -1;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i] === "end" && insInd < 0) {
                insInd = i;
            }
            if (lines[i].includes("listed_series")) {
                listInd = i;
                break;
            }
        }
        if (listInd > -1) {
            lines[listInd] = listString;
        } else if (insInd > -1) {
            lines.splice(insInd + 1, 0, listString);
        } else {
            lines.push(listString);
        }
        return lines.join("\r\n");
    }
    return file;
}

const fs = require("fs");

const IN_DIR = "./script/";
const OUT_DIR = "./newscript/";
const UPDATE_FUNCS = [updateGetID, updateSimple, updateOperators, updateRegisterFlags, updateListedNames, updateListedSets]; // order of ID/constants matters if updating a card with an ID that is a constant
function updateScript(fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(IN_DIR + fileName, "utf8", async (err, file) => {
            if (err) {
                return reject(err);
            }
            for (const func of UPDATE_FUNCS) {
                file = await func(file, fileName);
            }
            fs.writeFile(OUT_DIR + fileName, file, "utf8", e => {
                if (e) {
                    return reject(e);
                }
                resolve();
            });
        });
    });
}

fs.readdir(IN_DIR, (err, files) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Starting script update!");
        let i = 0;
        const thresh = files.length / 2;
        let yet = false;
        const promises = [];
        for (const fileName of files) {
            //console.log("Updating " + fileName + "!"); // disabled to prevent slowdown with many files
            promises.push(
                updateScript(fileName).then(() => {
                    if (!yet) {
                        i++;
                        if (i++ > thresh) {
                            console.log("Halfway there!");
                            yet = true;
                        }
                    }
                })
            ); // don't await, handle multiple files at once
        }
        console.log("Started all updates!");
        Promise.all(promises).then(() => {
            console.log("Done!");
        });
    }
});
