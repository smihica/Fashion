形状の変更オブジェクト
----------------------

.. js:class:: Transform()

   インターフェースクラスです。

   .. method:: get_gravity()

      :return: x,yのプロパティーを持った重心点の座標データ

      重心点を算出して返す。

   .. method:: rotate(r, x, y)

      :arg Double r: 回転角度
      :arg Double x: 回転の中心点のx座標
      :arg Double y: 回転の中心点のy座標
      :return: 自分自身のオブジェクトを返す。

      オブジェクトを回転させる。

   .. method:: scale(v, x, y)

      :arg Double v: 拡大縮小の倍率
      :arg Double x: 拡大縮小の中心点のx座標
      :arg Double y: 拡大縮小の中心点のy座標
      :return: 自分自身のオブジェクトを返す。

      オブジェクトの拡大縮小を行う。

   .. method:: translate(x, y)

      :arg Double x: 移動後のx座標
      :arg Double y: 移動後のy座標
      :return: 自分自身のオブジェクトを返す。

      オブジェクトを移動する。
