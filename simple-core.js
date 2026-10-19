(function(root){
function headCost({mode,sea,tax,batchCbm,unitCbm,qty}){
 const isValid=v=>typeof v==='number'&&Number.isFinite(v)&&v>=0;
 if(!Number.isFinite(unitCbm)||unitCbm<=0||!Number.isInteger(qty)||qty<1)throw Error('请填写有效的包装尺寸和正整数套数');
 if(!isValid(sea))throw Error('请填写海运物流费用');
 if(!isValid(tax))throw Error('请填写清关税费，没有费用时填0');
 if(!['cbm','batch'].includes(mode))throw Error('计费方式无效');
 if(mode==='batch'&&(!Number.isFinite(batchCbm)||batchCbm<=0))throw Error('请填写本次账单对应的整批总体积');
 if(mode==='batch'&&unitCbm*qty>batchCbm+1e-8)throw Error('当前产品总体积超过账单整批体积，请检查套数或整批CBM');
 const div=mode==='batch'?batchCbm:1;
 const seaPerCbm=sea/div,taxPerCbm=tax/div,seaPerUnit=seaPerCbm*unitCbm,taxPerUnit=taxPerCbm*unitCbm;
 return {seaPerCbm,taxPerCbm,seaPerUnit,taxPerUnit,unit:seaPerUnit+taxPerUnit,batch:(seaPerUnit+taxPerUnit)*qty};
}
root.SIMPLE={headCost};if(typeof module!=='undefined')module.exports=root.SIMPLE;
})(typeof window!=='undefined'?window:globalThis);
