// Ícone em degradê vivo (estilo app) · After Effects 2023 ou mais novo
// Uso: File > Scripts > Run Script File... e escolher este arquivo.
// Deixe "ciclo-de-cor.png" na mesma pasta do script.
// Opcional: "AfterGlow.ffx" (preset grátis da Creation Effects) na mesma pasta ou na pasta Presets do After.
//
// Monta, no projeto aberto, a pasta "Icone degrade" com 5 composições:
//   Ciclo de cor      -> faixa de cores que desce sem parar (faz o papel de Gradient Ramp + Colorama com Phase Shift)
//   Pre-comp 1        -> Turbulent Displace + Fast Box Blur sobre o ciclo
//   Displacement footage -> quadrado arredondado cinza com Inner Glow branco (vira máscara e mapa de tempo)
//   Base              -> Pre-comp 1 recortado pela máscara + Turbulent + VR Plane to Sphere + Time Displacement
//   Final File        -> Base em 64% + camada de ajuste com Noise e brilho (AfterGlow, ou Glow se não houver)
(function () {
    var W = 1080, H = 1080, VW = 1080, VH = 1920, DUR = 7.5333333, FPS = 30, FIM = 7.5;
    var pasta = File($.fileName).parent;

    function fx(layer, nomes) {
        var efs = layer.property("ADBE Effect Parade");
        for (var i = 0; i < nomes.length; i++) {
            try { if (efs.canAddProperty(nomes[i])) return efs.addProperty(nomes[i]); } catch (e) {}
        }
        return null;
    }
    function poe(ef, nome, valor) { try { ef.property(nome).setValue(valor); } catch (e) {} }
    function anima(ef, nome, a, b) { try { var p = ef.property(nome); p.setValueAtTime(0, a); p.setValueAtTime(FIM, b); } catch (e) {} }
    function acha(nome) {
        var lugares = [($.global.PASTA_PRESETS || pasta.fsName) + "/" + nome, pasta.fsName + "/" + nome, pasta.parent.fsName + "/" + nome,
            Folder.appPackage.fsName + "/Presets/" + nome, Folder.appPackage.fsName + "/Presets/Creation Effects/" + nome,
            Folder.myDocuments.fsName + "/Adobe/After Effects " + app.version.split(".")[0] + "/User Presets/" + nome];
        for (var i = 0; i < lugares.length; i++) { var f = new File(lugares[i]); if (f.exists) return f; }
        return null;
    }

    app.beginUndoGroup("Icone degrade");
    var proj = app.project || app.newProject();
    var dir = proj.items.addFolder("Icone degrade");
    function comp(nome, w, h) { var c = proj.items.addComp(nome, w, h, 1, DUR, FPS); c.parentFolder = dir; c.bgColor = [0, 0, 0]; return c; }

    // ---------- Ciclo de cor (4 ciclos empilhados; desce 3 ciclos em 7,5 s) ----------
    var png = new File(pasta.fsName + "/ciclo-de-cor.png");
    if (!png.exists) { alert("Coloque ciclo-de-cor.png na mesma pasta do script."); return; }
    var ciclo = comp("Ciclo de cor", W, H);
    var img = proj.importFile(new ImportOptions(png)); img.parentFolder = dir;
    var faixa = ciclo.layers.add(img);
    var tr = faixa.property("ADBE Transform Group");
    tr.property("ADBE Anchor Point").setValue([W / 2, 0]);
    var pos = tr.property("ADBE Position");
    pos.setValueAtTime(0, [W / 2, -3 * H]); pos.setValueAtTime(FIM, [W / 2, 0]);
    // movimento linear e contínuo, como o Phase Shift do Colorama
    try { pos.setInterpolationTypeAtKey(1, KeyframeInterpolationType.LINEAR); pos.setInterpolationTypeAtKey(2, KeyframeInterpolationType.LINEAR); } catch (e) {}

    // ---------- Pre-comp 1 ----------
    var pre = comp("Pre-comp 1", W, H);
    var cl = pre.layers.add(ciclo);
    var t1 = fx(cl, ["ADBE Turbulent Displace"]);
    if (t1) { poe(t1, "ADBE Turbulent Displace-0002", 119); poe(t1, "ADBE Turbulent Displace-0003", 295); poe(t1, "ADBE Turbulent Displace-0008", 1); anima(t1, "ADBE Turbulent Displace-0006", 0, 720); }
    var bb = fx(cl, ["ADBE Box Blur2"]);
    if (bb) poe(bb, "ADBE Box Blur2-0001", 54);

    // ---------- Displacement footage ----------
    var disp = comp("Displacement footage", W, H);
    var sh = disp.layers.addShape(); sh.name = "Quadrado";
    var g = sh.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
    var cont = g.property("ADBE Vectors Group");
    var ret = cont.addProperty("ADBE Vector Shape - Rect");
    ret.property("ADBE Vector Rect Size").setValue([682.67, 682.67]);
    ret.property("ADBE Vector Rect Roundness").setValue(157);
    cont.addProperty("ADBE Vector Graphic - Fill").property("ADBE Vector Fill Color").setValue([0.3686, 0.3686, 0.3686, 1]);
    sh.property("ADBE Transform Group").property("ADBE Scale").setValue([139, 139]);
    // Inner Glow branco: a borda fica clara e o Time Displacement "atrasa" só ali
    try {
        for (var s = 1; s <= disp.numLayers; s++) disp.layer(s).selected = false;
        sh.selected = true; disp.openInViewer();
        app.executeCommand(app.findMenuCommandId("Inner Glow"));
        var ig = sh.property("ADBE Layer Styles").property("innerGlow/enabled");
        ig.property("innerGlow/opacity").setValue(100);
        ig.property("innerGlow/color").setValue([1, 1, 1, 1]);
        ig.property("innerGlow/blur").setValue(54);
        ig.property("innerGlow/inputRange").setValue(100);
    } catch (e) {}

    // ---------- Base ----------
    var base = comp("Base", VW, VH);
    var pl = base.layers.add(pre);
    var dl = base.layers.add(disp);           // fica em cima (camada 1)
    dl.enabled = false;
    try { pl.setTrackMatte(dl, TrackMatteType.ALPHA); } catch (e) { try { pl.trackMatteType = TrackMatteType.ALPHA; } catch (e2) {} }
    pl.property("ADBE Transform Group").property("ADBE Scale").setValue([100.21, 100.38]);
    var t2 = fx(pl, ["ADBE Turbulent Displace"]);
    if (t2) { poe(t2, "ADBE Turbulent Displace-0002", 147); poe(t2, "ADBE Turbulent Displace-0003", 218); anima(t2, "ADBE Turbulent Displace-0006", 0, 720); }
    var vr = fx(pl, ["Mettle SkyBox Project 2D"]);
    if (vr) { poe(vr, "Mettle SkyBox Project 2D-0017", 88); poe(vr, "Mettle SkyBox Project 2D-0018", 143); poe(vr, "Mettle SkyBox Project 2D-0002", 103); }
    var td = fx(pl, ["ADBE Time Displacement"]);
    if (td) { poe(td, "ADBE Time Displacement-0001", dl.index); poe(td, "ADBE Time Displacement-0002", -0.65); poe(td, "ADBE Time Displacement-0003", 90); }

    // ---------- Final File ----------
    var fin = comp("Final File", VW, VH);
    var bl = fin.layers.add(base);
    bl.property("ADBE Transform Group").property("ADBE Scale").setValue([64, 64]);
    var aj = fin.layers.addSolid([1, 1, 1], "Brilho e grão", VW, VH, 1, DUR);
    aj.adjustmentLayer = true;
    var nz = fx(aj, ["ADBE Noise2", "ADBE Noise"]);
    if (nz) { poe(nz, "ADBE Noise2-0001", 5); poe(nz, "ADBE Noise-0001", 5); }
    var brilho = "Glow nativo";
    var ag = acha("AfterGlow.ffx");
    if (ag) {
        try {
            aj.applyPreset(ag); brilho = "AfterGlow";
            // brilho suave e largo, perto do Deep Glow do original (Radius 438, Exposure 0,326)
            var ctl = aj.property("ADBE Effect Parade").property("AfterGlow Controls");
            ctl.property("Threshold").setValue(85);
            ctl.property("Intensity").setValue(0.35);
            ctl.property("Opacity").setValue(28);
        } catch (e) {}
    }
    if (brilho !== "AfterGlow") {
        var gl = fx(aj, ["ADBE Glo2"]);
        if (gl) { poe(gl, "ADBE Glo2-0002", 60); poe(gl, "ADBE Glo2-0003", 120); poe(gl, "ADBE Glo2-0004", 0.8); }
    }

    fin.openInViewer();
    app.endUndoGroup();
    $.global.ICONE_DEGRADE = { comp: fin, brilho: brilho };
})();
