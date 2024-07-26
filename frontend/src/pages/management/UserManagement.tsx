import React, { useState } from "react";
// import {
//   TETabs,
//   TETabsContent,
//   TETabsItem,
//   TETabsPane,
// } from "tw-elements-react";
// // import { SearchableList } from "../../components";

export function UserManagement() {
	return <>User Management</>;
}

// export function UserSettings () {
//     const [basicActive, setBasicActive] = useState("tab1");

//     const handleBasicClick = (value: string) => {
//         if (value === basicActive) {
//         return;
//         }
//         setBasicActive(value);
//     };

//     return <>
//         <div className="p-5 h-screen bg-gc-white w-full">
//             <h1 className="text-4xl mb-4">Usuarios</h1>

//             {/* <SearchableList /> */}

//             <div className="mb-3">
//                 <TETabs>
//                     <TETabsItem
//                     onClick={() => handleBasicClick("tab1")}
//                     active={basicActive === "tab1"}
//                     >
//                     Información
//                     </TETabsItem>
//                     <TETabsItem
//                     onClick={() => handleBasicClick("tab2")}
//                     active={basicActive === "tab2"}
//                     >
//                     Eventos
//                     </TETabsItem>
//                 </TETabs>

//                 <TETabsContent>
//                     <TETabsPane show={basicActive === "tab1"}>Detalles de usuario</TETabsPane>
//                     <TETabsPane show={basicActive === "tab2"}>Detalles de evento para usuario</TETabsPane>
//                 </TETabsContent>
//             </div>
//         </div>
//     </>;
// };