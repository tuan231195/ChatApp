export const SCROLL_DIRECTIVE_NAME = "scroll";

export function scrollDirective($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            scope.$watchCollection(attr.scroll, function (newValue) {
                if (newValue) {
                    console.log($(element)[0].scrollHeight);
                    $(element).scrollTop($(element)[0].scrollHeight);
                }
            });
        }
    }
};

scrollDirective.$inject = ['$timeout'];