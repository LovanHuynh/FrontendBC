export const adminMenu = [
    { //quản lí ngời dùng
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage'
            },
            {
                name: 'menu.admin.crudRedux', link: '/system/user-redux'
            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },
            // {
            //     name: 'menu.admin.manage-admin', link: '/system/user-admin'
            // },
            { // quản lí kế hoạch khám bệnh bác sĩ
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'
            },

        ]
    },
    { //quản lí phòng khám
        name: 'menu.admin.clinic',
        menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic'
            }

        ]
    },
    { //quản lí chuyên khoa
        name: 'menu.admin.specialty',
        menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty'
            }

        ]
    },
    { //quản lí cẩm nang
        name: 'menu.admin.handbook',
        menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/manage-handbook'
            }

        ]
    },
];

export const doctorMenu = [
    {
        name: 'menu.admin.manage-user',
        menus: [
            { // quản lí kế hoạch khám bệnh bác sĩ
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'
            },
            { // quản lí kế hoạch khám bệnh bác sĩ
                name: 'menu.doctor.manage-patient', link: '/doctor/manage-patient'
            },
        ]
    }

];