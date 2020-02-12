"use strict";
var AdLunam;
(function (AdLunam) {
    var fudge = FudgeCore;
    class HitboxObject extends fudge.Node {
        constructor(_name) {
            super(_name);
        }
        createHitbox(_name, _yTranslation, _scale) {
            let hitbox = new AdLunam.Hitbox(_name);
            hitbox.cmpTransform.local.translateY(_yTranslation);
            hitbox.cmpTransform.local.scale(_scale);
            return hitbox;
        }
    }
    AdLunam.HitboxObject = HitboxObject;
})(AdLunam || (AdLunam = {}));
//# sourceMappingURL=HitBoxObject.js.map