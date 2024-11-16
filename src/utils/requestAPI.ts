import { AxiosResponse } from "axios";
import store from "@/store";
import { User } from "@/types";
import axiosInstance from '@/utils/http'

/**
 * 查询基本信息
 */
 export function queryBaseInfo (){
    axiosInstance({
        url: '/baseInfo',
        method: 'get',
        params:  {
        },
        showLoading: false,//是否显示加载图标
        loadingMask:false,// 是否显示遮罩层
    })
    .then((response: AxiosResponse) => {
        const result: any = response.data;
        if(result != ""){
            let resultData = JSON.parse(result);
            store.commit('setBaseURL', resultData.baseURL);
            store.commit('setCommonPath', resultData.commonPath);
            store.commit('setContextPath', resultData.contextPath);
            store.commit('setTemplateDir', resultData.templateDir);
            store.commit('setTitle', resultData.title);
            store.commit('setKeywords', resultData.keywords);
            store.commit('setDescription', resultData.description);
            if(resultData.systemUser != null){
                store.commit('setSystemUser', resultData.systemUser);
            }
            store.commit('setBaseURI', resultData.baseURI);
            store.commit('setFileStorageSystem', resultData.fileStorageSystem);
            store.commit('setSupportAccessDevice', resultData.supportAccessDevice);
            store.commit('setWeixin_oa_appid', resultData.weixin_oa_appid);
        }

    }).catch((error: any) =>{
        console.log(error);
    });

}


let queryData = (keyword:string) =>{
   /**
    const [res] = await Promise.all([axiosInstance({
        url: '/user/control/queryUser',
        method: 'get',
        params:  {keyword:keyword},
        showLoading: false,//是否显示加载图标
        loadingMask:false,// 是否显示遮罩层
        })])

        console.log("查询提及用户",res);

    return res**/

    /** 
    return axiosInstance({ 
        url: '/user/control/queryUser',
        method: 'get',
        params:  {keyword:keyword},
        showLoading: false,//是否显示加载图标
        loadingMask:false,// 是否显示遮罩层
    })**/
    return new Promise((resolve, reject) => {
        axiosInstance({ 
            url: '/user/control/queryUser',
            method: 'get',
            params:  {keyword:keyword},
            showLoading: false,//是否显示加载图标
            loadingMask:false,// 是否显示遮罩层
        }).then((result) => {
            console.log("查询提及用户");
            resolve(result);
        })
    }); 
};


/**
 * 查询提及用户
 * @param keyword 关键字
 * @param callback 回调
 */
export function queryMentionUser(keyword:string,callback: { (mentionUser: User): void; (arg0: User | undefined): void; }){
    axiosInstance({
        url: '/user/control/queryUser',
        method: 'get',
        params:  {keyword:keyword},
        showLoading: false,//是否显示加载图标
        loadingMask:false,// 是否显示遮罩层
    }).then((response: AxiosResponse) => {
        const result: any = response.data;
        if(result != ""){
            let mentionUser:User = JSON.parse(result);
            if(mentionUser != null){
                callback(mentionUser);
                return;
            }
            
        }
        callback(undefined);
    }).catch((error: any) =>{
        console.log(error);
    });
}
