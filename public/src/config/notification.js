export default function NotiConfig(NotificationProvider) {
    NotificationProvider.setOptions({
        delay: 3000,
        verticalSpacing: 20,
        horizontalSpacing: 20,
        positionX: 'right',
        positionY: 'top'
    });
}

NotiConfig.$inject = ['NotificationProvider'];

