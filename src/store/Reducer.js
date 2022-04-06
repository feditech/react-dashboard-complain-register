const Reducer = (state, action) => {
  switch (action.type) {
    case "SIGNIN":
      console.log('action payyyyload', action.payload)
      return {
        ...state,
        user: action.payload,
        isSignIn: true,
      };
    case "SIGNOUT":
      return {
        user: [],
        isSignIn: false,
        userSubscriptions: [],
        myLeads: [],
        walet: null,
        notification: null,
      };
    case "GET_CLIENTS":
      return {
        ...state,
        clients: action.payload,
      };
    case "ADD_CLIENT":
      return {
        ...state,
        clients: Array.isArray(state.clients) ? [...state.clients, action.payload] : [action.payload],
      };
    case "GET_PACKAGES":
      return {
        ...state,
        packages: action.payload,
      };
    case "ADD_PACKAGE":
      return {
        ...state,
        packages: Array.isArray(state.packages) ? [...state.packages, action.payload] : [action.payload],
      };
    case "GET_COMPLAINS":
      return {
        ...state,
        complains: action.payload,
      };
    case "ADD_COMPLAIN":
      return {
        ...state,
        complains: Array.isArray(state.complains) ? [...state.complains, action.payload] : [action.payload],
      };
    //   case "UPDATE_SUBSCRIPTION":
    //     // console.log(action.payload);
    //     let updateSubscriptions = state.userSubscriptions.map((subscription) => {
    //       if (subscription._id === action.payload._id) {
    //         return action.payload;
    //       }
    //       return subscription;
    //     });
    //     return {
    //       ...state,
    //       userSubscriptions: updateSubscriptions,
    //     };
    //   case "SET_MY_LEADS":
    //     return {
    //       ...state,
    //       myLeads: action.payload,
    //     };
    //   case "NEW_LEADS":
    //     let leads = state.myLeads;
    //     leads.push(action.payload);
    //     return {
    //       ...state,
    //       myLeads: leads,
    //     };
    //   case "UPDATE_MY_LEADS":
    //     let updateMyLead = state.myLeads.map((lead) => {
    //       if (lead._id === action.payload._id) {
    //         return action.payload;
    //       }
    //       return lead;
    //     });
    //     return {
    //       ...state,
    //       myLeads: updateMyLead,
    //     };
    //   case "GETUSERWALLET":
    //     return {
    //       ...state,
    //       wallet: action.payload,
    //     };
    //   case "ADD_WALLET":
    //     let updateWallet = state.wallet;
    //     updateWallet.amount =
    //       Number(updateWallet.amount) + Number(action.payload);
    //     return {
    //       ...state,
    //       wallet: updateWallet,
    //     };
    //   case "GET_NOTIFICATION":
    //     return {
    //       ...state,
    //       notification: action.payload,
    //     };
    //   case "Update_NOTIFICATION":
    //     let updatenotification = state.notification.map((lead) => {
    //       if (lead._id === action.payload._id) {
    //         return action.payload;
    //       }
    //       return lead;
    //     });
    //     return {
    //       ...state,
    //       notification: updatenotification,
    //     };
    //   case "DISPLAY":
    //     let newdata = state.display ? state.display : [];
    //     if (newdata.length === 0) {
    //       action.payload.map((item) => newdata.push(item));
    //     } else if (newdata.length > 0) {
    //       action.payload.map(
    //         (item, index) => (newdata[index].value = item.value)
    //       );
    //     }
    //     return {
    //       ...state,
    //       display: newdata,
    //     };
    //   case "DISPLAY_TOTAL_SUBCRIPTION":
    //     let newdata3 = state.display ? state.display : [];
    //     newdata3[3] = action.payload;
    //     return {
    //       ...state,
    //       display: newdata3,
    //     };
    //   case "GET_ZIPCODE":
    //     return {
    //       ...state,
    //       zipcode: action.payload,
    //     };
    //   case "UPDATE_ZIPCODE_LIST":
    //     let newZip = state.zipcode;
    //     newZip.push(action.payload);
    //     return {
    //       ...state,
    //       zipcode: newZip,
    //     };
    //   case "GET_SUBSCRIBERS":
    //     return {
    //       ...state,
    //       subcribe: action.payload,
    //     };
    //   case "UPDATE_SUBCRIBE_LIST":
    //     let newsubcribe = state.subcribe;
    //     newsubcribe.push(action.payload);
    //     return {
    //       ...state,
    //       subcribe: newsubcribe,
    //     };
    //   case "GET_LEADS":
    //     console.log(action.payload,"GET_LEADS")
    //     return {
    //       ...state,
    //       leads: action.payload,
    //     };
    //   case "UPDATE_LEADS_LIST":
    //     let newleads = state.leads;
    //     newleads.push(action.payload);
    //     return {
    //       ...state,
    //       leads: newleads,
    //     };
    default:
      return state;
  }
};

export default Reducer;