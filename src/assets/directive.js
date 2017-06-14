/**
 * directives
 * Created by Aeo on 2017/6/14.
 */
import { dom } from 'regularjs';

export default {
    'r-stopPropagation': function(elem) {
        dom.on(elem, 'click', handleClick);

        function handleClick(e) {
            e && e.stopPropagation();
        }

        return () => {
            dom.off(elem, 'click', handleClick);
        };
    }
};